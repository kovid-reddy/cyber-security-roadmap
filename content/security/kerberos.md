---
title: Kerberos
category: security
status: not-started
difficulty: intermediate
summary: Network authentication protocol using encrypted tickets. The default authentication mechanism in Windows Active Directory environments.
connections:
  - security/active-directory
  - security/ldap
  - security/authentication
  - networking/dns
  - security/privilege-escalation
tags:
  - security
  - identity
  - windows
---

## How Kerberos Works

1. User authenticates to **KDC (Key Distribution Center)**
2. KDC issues a **TGT (Ticket Granting Ticket)**
3. Client uses TGT to request a **service ticket** for a specific resource
4. Service validates the ticket — no password sent over network

## Key Components

- **KDC** — Authentication Server (AS) + Ticket Granting Server (TGS)
- **TGT** — Encrypted with krbtgt hash, proves identity to TGS
- **Service Ticket** — Allows access to a specific service

## Attacks

- **Kerberoasting** — request service tickets for SPNs, crack offline
- **AS-REP Roasting** — for accounts with pre-auth disabled
- **Golden Ticket** — forge TGT using krbtgt hash (full domain compromise)
- **Silver Ticket** — forge service ticket for a specific service
- **Pass the Ticket** — inject stolen tickets into current session

## Tools

```bash
# Kerberoasting with impacket
GetUserSPNs.py domain/user:pass -request

# Rubeus (Windows)
Rubeus.exe kerberoast
```
