---
title: Python
category: programming
status: not-started
difficulty: beginner
summary: The most widely used language in cybersecurity — automation, exploit dev, scripting, data analysis, and building security tools.
connections:
  - programming/bash
  - programming/powershell
tags:
  - programming
  - automation
  - scripting
---

## Why Python for Security?

- Most security tools are written in Python (Impacket, Scapy, pwntools)
- Fast prototyping of exploits and scripts
- Excellent library ecosystem for networking, crypto, and web
- Used in CTFs extensively

## Security-Relevant Libraries

```python
import socket      # raw networking
import requests    # HTTP requests
import scapy       # packet crafting/sniffing
import paramiko    # SSH automation
import cryptography # crypto operations
import pwntools    # CTF/exploit dev
import impacket    # Windows protocol implementations
```

## Quick Examples

```python
# Port scanner
import socket
for port in range(1, 1025):
    s = socket.socket()
    s.settimeout(0.5)
    if s.connect_ex(('target', port)) == 0:
        print(f"Port {port} open")
    s.close()

# Hash a password
import hashlib
h = hashlib.sha256(b"password").hexdigest()
```

## CTF-Specific

- **pwntools** — binary exploitation framework
- **z3** — constraint solver for crypto challenges
- **PIL/Pillow** — image steganography challenges
