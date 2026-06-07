---
title: Linux
category: operating-systems
status: not-started
difficulty: beginner
summary: Open-source Unix-like OS. Essential for security work — most servers, hacking distros, and security tools run on Linux.
connections:
  - operating-systems/windows
  - security/privilege-escalation
  - programming/bash
tags:
  - os
  - linux
  - fundamentals
---

## Why Linux for Security?

- Most web servers run Linux
- Security distros (Kali, Parrot) are Linux-based
- Most security tools are Linux-native
- Understanding Linux = understanding most attack surfaces

## Essential Commands

```bash
# Navigation
ls -la          # list files with permissions
cd /path        # change directory
pwd             # current directory
find / -name "file" 2>/dev/null

# File operations
cat file.txt    # read file
grep "pattern" file  # search in file
chmod 755 file  # change permissions
chown user file # change ownership

# Process & network
ps aux          # list processes
netstat -tulpn  # open ports
ss -tulpn       # modern netstat

# User management
whoami          # current user
id              # user ID and groups
sudo -l         # what can I run as sudo?
```

## File System Hierarchy

```
/               Root
/etc            Configuration files
/home           User home directories
/var/log        Log files
/tmp            Temporary files (world-writable)
/usr/bin        User binaries
/root           Root home directory
```

## Permissions

`rwxr-xr-x` = owner:rwx, group:r-x, others:r-x

- r=4, w=2, x=1
- `chmod 755` = rwxr-xr-x
- `chmod 600` = rw------- (private key files)
