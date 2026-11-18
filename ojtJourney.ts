export type OjtWeek = {
  number: number;
  dates: string;
  title: string;
  summary: string;
  focus: string[];
  extensions: string[];
};

export const ojtWeeks: OjtWeek[] = [
  {
    number: 1,
    dates: 'June 9–13, 2026',
    title: 'Getting to know the lab infrastructure',
    summary: 'Started with workstation and equipment audits across the computer laboratories, checking UPS pairings, monitor assignments, asset records, and power management.',
    focus: ['Workstation audit', 'UPS and monitors', 'Asset inventory'],
    extensions: ['.jpg', '.jpg', '.jpg', '.jpg', '.jpg', '.png'],
  },
  {
    number: 2,
    dates: 'June 15–20, 2026',
    title: 'Preparing and upgrading workstations',
    summary: 'Helped reformat and upgrade workstations from Windows 10 to Windows 11, set up monitors, and maintain the asset system with updated labels.',
    focus: ['Windows upgrades', 'Monitor setup', 'Asset labeling'],
    extensions: ['.jpg', '.jpg', '.jpg', '.jpg', '.jpg'],
  },
  {
    number: 3,
    dates: 'June 22–27, 2026',
    title: 'Updating records and checking equipment',
    summary: 'Updated inventory records, prepared shutdown signage, checked workstation and monitor configurations, and catalogued hardware around the labs.',
    focus: ['Inventory system', 'Lab checks', 'Hardware cataloguing'],
    extensions: ['.jpg', '.png', '.png', '.png', '.png', '.png'],
  },
  {
    number: 4,
    dates: 'June 29–July 4, 2026',
    title: 'Network checks and semester readiness',
    summary: 'Worked through network connectivity and IP checks, switch configuration, workstation readiness reviews, and software deployment ahead of the semester.',
    focus: ['Network connectivity', 'Switch configuration', 'Software deployment'],
    extensions: ['.jpg', '.jpg', '.jpg', '.jpg', '.jpg'],
  },
  {
    number: 5,
    dates: 'July 6–9, 2026',
    title: 'Connecting and tagging lab equipment',
    summary: 'Continued asset tagging, installed and updated academic applications, and crimped CAT5 cables for switch integration.',
    focus: ['Asset tagging', 'Academic apps', 'CAT5 cabling'],
    extensions: ['.jpg', '.jpg', '.jpg'],
  },
  {
    number: 6,
    dates: 'July 13–18, 2026',
    title: 'Organizing systems and deployments',
    summary: 'Installed and organized a server rack, deployed software across computer labs, and verified systems after setup.',
    focus: ['Server rack', 'Lab deployments', 'System verification'],
    extensions: ['.jpg', '.jpg', '.jpg', '.jpg', '.jpg'],
  },
  {
    number: 7,
    dates: 'July 20–25, 2026',
    title: 'Troubleshooting and system recovery',
    summary: 'Installed software and a standard desktop wallpaper, used AOMEI for backups and drive cloning, investigated BIOS and update issues, and recovered usable drives and SSDs.',
    focus: ['Software setup', 'Backup and cloning', 'Hardware troubleshooting'],
    extensions: ['.jpg', '.jpg', '.jpg', '.jpg'],
  },
];

export type OjtPhoto = {
  src: string;
  alt: string;
  weekNumber: number;
  weekTitle: string;
  photoNumber: number;
};

export const ojtPhotos: OjtPhoto[] = ojtWeeks.flatMap((week) =>
  week.extensions.map((extension, index) => {
    const photoNumber = index + 1;
    const weekNumber = String(week.number).padStart(2, '0');
    const imageNumber = String(photoNumber).padStart(2, '0');

    return {
      src: `/ojt-journey/week-${weekNumber}-${imageNumber}${extension}`,
      alt: `OJT activity, week ${week.number}, photo ${photoNumber}: ${week.title}`,
      weekNumber: week.number,
      weekTitle: week.title,
      photoNumber,
    };
  }),
);
