---
title: DMZ
category: security
status: not-started
difficulty: intermediate
summary: Demilitarized Zone — a network segment that sits between the internet and internal network, hosting public-facing services while isolating internal resources.
connections:
  - networking/vlan
  - security/firewall
tags:
  - security
  - networking
  - architecture
---

## What is a DMZ?

A DMZ is a physical or logical subnet that separates public-facing servers (web, mail, DNS) from the internal LAN. Two firewalls typically bound it — one facing the internet, one facing the internal network.

## Architecture

```
Internet → [Firewall 1] → DMZ (web/mail/DNS servers)
                            → [Firewall 2] → Internal LAN
```

## What lives in the DMZ

- Web servers
- Email servers (MX)
- Public DNS servers
- VPN concentrators
- Reverse proxies / load balancers

## Why it matters

Even if an attacker compromises a DMZ host, the internal firewall prevents lateral movement into the core network.
