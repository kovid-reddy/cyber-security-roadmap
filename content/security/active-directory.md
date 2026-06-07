---
title: Active Directory
category: security
status: not-started
difficulty: intermediate
summary: Microsoft's directory service for Windows domain networks. Manages users, computers, groups, and policies centrally.
connections:
  - security/kerberos
  - security/ldap
  - networking/dns
  - security/authentication
  - security/privilege-escalation
tags:
  - security
  - windows
  - identity
---

## What is Active Directory?

AD is Microsoft's identity and access management solution for Windows environments. It stores information about network objects (users, computers, printers) and controls who can access what.

## Key Components

- **Domain** — administrative boundary (e.g., company.local)
- **Forest** — one or more domains with shared schema
- **Domain Controller (DC)** — server running AD DS
- **OU (Organizational Unit)** — container for organizing objects
- **GPO (Group Policy Object)** — settings applied to users/computers

## Why it matters in security

AD is the crown jewel of Windows networks. Compromising AD = compromising everything. Key attack paths:

- **Pass the Hash** — use NTLM hash without knowing the password
- **Kerberoasting** — request service tickets and crack them offline
- **DCSync** — simulate a DC to pull password hashes
- **Golden Ticket** — forge Kerberos tickets with krbtgt hash

## Defensive measures

- Tiered admin model
- Privileged Access Workstations (PAW)
- Enable audit logging
- Protect the krbtgt account
