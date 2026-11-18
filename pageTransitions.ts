const TRANSITION_PENDING_KEY = 'yuehan-page-transition-pending';
const EXIT_DURATION_MS = 390;
const ENTER_DURATION_MS = 860;

function addCurtain(className: string) {
  const curtain = document.createElement('div');
  curtain.className = `page-transition-curtain ${className}`;
  curtain.setAttribute('aria-hidden', 'true');

  const atmosphere = document.createElement('span');
  atmosphere.className = 'page-transition-atmosphere';
  curtain.append(atmosphere);

  const grid = document.createElement('span');
  grid.className = 'page-transition-grid';
  curtain.append(grid);

  ['one', 'two', 'three'].forEach((orbit) => {
    const ring = document.createElement('span');
    ring.className = `page-transition-orbit page-transition-orbit-${orbit}`;
    curtain.append(ring);
  });

  ['one', 'two', 'three'].forEach((streak) => {
    const light = document.createElement('span');
    light.className = `page-transition-streak page-transition-streak-${streak}`;
    curtain.append(light);
  });

  ['top', 'bottom', 'left', 'right'].forEach((side) => {
    const panel = document.createElement('span');
    panel.className = `page-transition-panel page-transition-panel-${side}`;
    curtain.append(panel);
  });

  const particleCount = 18;
  for (let index = 0; index < particleCount; index += 1) {
    const angle = -Math.PI / 2 + (index / particleCount) * Math.PI * 2;
    const distance = 56 + (index % 4) * 17;
    const particle = document.createElement('span');
    particle.className = 'page-transition-particle';
    particle.style.setProperty('--particle-dx', `${Math.cos(angle) * distance}vmax`);
    particle.style.setProperty('--particle-dy', `${Math.sin(angle) * distance}vmax`);
    particle.style.setProperty('--particle-delay', `${(index % 6) * 16}ms`);
    particle.style.setProperty('--particle-size', index % 5 === 0 ? '3px' : '2px');
    curtain.append(particle);
  }

  document.body.append(curtain);
  return curtain;
}

function readPendingTransition() {
  try {
    const isPending = window.sessionStorage.getItem(TRANSITION_PENDING_KEY) === 'true';
    window.sessionStorage.removeItem(TRANSITION_PENDING_KEY);
    return isPending;
  } catch {
    return false;
  }
}

function playEntryTransition() {
  document.body.classList.add('page-transition-in');
  const curtain = addCurtain('is-entering');
  window.setTimeout(() => {
    curtain.remove();
    document.body.classList.remove('page-transition-in');
  }, ENTER_DURATION_MS);
}

export function initializePageTransitions() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    try {
      window.sessionStorage.removeItem(TRANSITION_PENDING_KEY);
    } catch {
      // Ignore unavailable storage when motion is disabled.
    }
    return;
  }

  if (readPendingTransition()) {
    playEntryTransition();
  }

  let navigating = false;

  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    navigating = false;
    document.body.classList.remove('page-transition-out', 'page-transition-in');
    document.querySelectorAll('.page-transition-curtain').forEach((curtain) => curtain.remove());
    playEntryTransition();
  });

  document.addEventListener('click', (event) => {
    if (navigating || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;

    const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;

    const destination = new URL(anchor.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.pathname !== '/' && !destination.pathname.toLowerCase().endsWith('.html')) return;
    if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;

    event.preventDefault();
    navigating = true;

    try {
      window.sessionStorage.setItem(TRANSITION_PENDING_KEY, 'true');
    } catch {
      // The outgoing transition still plays if storage is unavailable.
    }

    document.body.classList.add('page-transition-out');
    addCurtain('is-leaving');
    window.setTimeout(() => window.location.assign(destination.href), EXIT_DURATION_MS);
  });
}
