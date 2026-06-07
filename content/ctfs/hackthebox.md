---
title: HackTheBox
category: ctfs
status: not-started
difficulty: intermediate
summary: Online platform with vulnerable machines and challenges. The go-to platform for practicing real-world penetration testing skills.
connections:
  - ctfs/tryhackme
  - security/privilege-escalation
  - security/active-directory
tags:
  - ctfs
  - practice
  - pentesting
---

## What is HackTheBox?

HTB provides a lab environment with vulnerable machines (boxes) across Linux, Windows, and Active Directory. You hack in, get user flag, escalate to root/admin, get root flag.

## Getting Started

1. Sign up at hackthebox.com
2. Start with **Starting Point** machines (guided)
3. Move to **Easy** rated boxes
4. Use the official writeups after retiring a box

## Methodology

```
Reconnaissance → Enumeration → Exploitation → PrivEsc → Flags
```

## Key Tools

- `nmap` — port scanning
- `gobuster/feroxbuster` — directory brute forcing
- `burpsuite` — web app testing
- `metasploit` — exploit framework
- `pwncat/evil-winrm` — post-exploitation shells
- `linpeas/winpeas` — privilege escalation enumeration

## Pro Tips

- Always do full port scan: `nmap -p- -T4`
- Enumerate every service, not just HTTP
- Check exploit-db for version-specific exploits
- Read writeups from IppSec on YouTube
