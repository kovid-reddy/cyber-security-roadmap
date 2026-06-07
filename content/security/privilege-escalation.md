---
title: Privilege Escalation
category: security
status: not-started
difficulty: advanced
summary: Gaining higher access rights than initially granted — vertical (user to admin) or horizontal (user to user).
connections:
  - security/active-directory
  - security/kerberos
  - operating-systems/linux
  - operating-systems/windows
tags:
  - security
  - offensive
  - pentesting
---

## Types

**Vertical** — low-privilege user → admin/root
**Horizontal** — user A → user B (same privilege level, different account)

## Linux PrivEsc Vectors

```bash
# SUID binaries
find / -perm -4000 2>/dev/null

# Writable cron jobs
cat /etc/crontab

# Sudo misconfigurations
sudo -l

# World-writable scripts run by root
find / -writable -type f 2>/dev/null
```

## Windows PrivEsc Vectors

- **Unquoted service paths** — spaces in paths without quotes
- **Weak service permissions** — can modify service binary
- **AlwaysInstallElevated** — MSI files run as SYSTEM
- **Token impersonation** — SeImpersonatePrivilege exploits (PrintSpoofer, Potato attacks)
- **DLL hijacking** — place malicious DLL in search path

## Resources

- GTFOBins (Linux)
- LOLBAS (Windows)
- HackTricks PrivEsc guide
