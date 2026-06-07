---
title: OSI Model
category: networking
status: not-started
difficulty: beginner
summary: The 7-layer framework that standardizes network communication — from physical signals to application data.
connections:
  - networking/dns
  - networking/subnetting
  - networking/ssl-tls
  - security/firewall
tags:
  - networking
  - fundamentals
  - protocols
---

## The 7 Layers

| Layer | Name | Examples |
|-------|------|---------|
| 7 | Application | HTTP, FTP, DNS, SMTP |
| 6 | Presentation | SSL/TLS, encoding, compression |
| 5 | Session | NetBIOS, RPC |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP, ICMP, routing |
| 2 | Data Link | Ethernet, MAC, ARP |
| 1 | Physical | Cables, Wi-Fi signals |

## Memory Aid

**"Please Do Not Throw Sausage Pizza Away"** (Physical → Application)

## Why it matters for security

Attacks happen at different layers:
- **Layer 2**: ARP spoofing, MAC flooding
- **Layer 3**: IP spoofing, routing attacks
- **Layer 4**: SYN flood, port scanning
- **Layer 7**: SQL injection, XSS, application exploits
