---
id: NET-001.3
title: DNS Records
category: networking
status: completed
difficulty: 2
summary: Understand the purpose of every important DNS record and where it is used in real-world infrastructure.
tags:
  - networking
  - dns
  - records
prerequisites:
  - NET-001.2
connections:
  - id: NET-001.4
    relationship: enables
---

# DNS Records

> *A DNS server doesn't store just IP addresses—it stores different types of information called Resource Records (RRs).*

---

# Mental Model

Think of DNS as a database.

```
Domain
        │
        ▼
Different Records
        │
        ├── A
        ├── AAAA
        ├── MX
        ├── TXT
        ├── NS
        ├── CNAME
        ├── SOA
        ├── PTR
        ├── CAA
        └── SRV
```

Every record answers a different question.

---

# Record Categories

Instead of memorizing 10 record types, group them.

| Purpose | Records |
|----------|----------|
| Website Address | A, AAAA |
| Aliases | CNAME |
| Email | MX |
| Verification & Security | TXT, CAA |
| DNS Infrastructure | NS, SOA |
| Reverse Lookup | PTR |
| Service Discovery | SRV |

---

# A Record

## Purpose

Maps a domain to an **IPv4 address**.

Example

```
scanner.kovid.dev

↓

18.160.200.25
```

Query

```bash
dig scanner.kovid.dev A
```

Used by

- Websites
- APIs
- Load Balancers

---

# AAAA Record

Same as an A record,

but for **IPv6**.

Example

```
google.com

↓

2404:6800:4007::200e
```

Modern services usually publish both A and AAAA records.

---

# CNAME Record

CNAME means

**Canonical Name**

It creates an alias.

Instead of

```
api.kovid.dev

↓

18.160.xx.xx
```

you can write

```
api.kovid.dev

↓

backend.kovid.dev

↓

18.160.xx.xx
```

Benefits

- Easier maintenance
- One IP change updates every alias

---

# MX Record

Mail Exchange Record.

Answers

```
Who receives email for this domain?
```

Example

```
gmail.com

↓

gmail-smtp-in.l.google.com
```

Without MX records,

email cannot be delivered correctly.

---

# TXT Record

TXT records store text.

Originally simple notes,

today they power many security systems.

Common uses

- Google Site Verification
- Microsoft Verification
- SPF
- DKIM
- DMARC

Example

```
google-site-verification

↓

abc123xyz
```

---

# NS Record

Name Server Record.

Answers

```
Who manages this domain?
```

Example

```
kovid.dev

↓

ns1.cloudflare.com

↓

ns2.cloudflare.com
```

Without NS records,

the Internet doesn't know where to find your DNS information.

---

# SOA Record

SOA

Start Of Authority.

Contains metadata about the DNS zone.

Includes

- Primary Name Server
- Administrator Email
- Serial Number
- Refresh Interval
- Retry Interval
- Expiration Time

DNS administrators use this during synchronization.

---

# PTR Record

PTR performs a

**Reverse DNS Lookup**

Normal DNS

```
Domain

↓

IP
```

PTR

```
IP

↓

Domain
```

Common uses

- Email servers
- Logging
- Network forensics

---

# CAA Record

CAA

Certificate Authority Authorization.

Specifies which Certificate Authorities are allowed to issue SSL/TLS certificates for your domain.

Example

```
Only Let's Encrypt
```

Without CAA,

any trusted CA could issue a certificate.

CAA reduces that risk.

---

# SRV Record

Service Record.

Instead of locating only an IP,

it locates a specific service.

Example

```
Kerberos

LDAP

SIP

Minecraft
```

SRV records can specify

- Host
- Port
- Priority
- Weight

Useful for enterprise applications.

---

# Complete DNS Zone

Example

```text
kovid.dev
│
├── A      → 18.160.200.25
├── AAAA   → 2404:6800::
├── MX     → mail.kovid.dev
├── TXT    → SPF / DKIM / Verification
├── NS     → Cloudflare
├── SOA    → Zone Metadata
├── CNAME  → api → backend
├── PTR    → Reverse Lookup
├── CAA    → Let's Encrypt
└── SRV    → LDAP Service
```

---

# Which Records Does a Browser Use?

A browser typically requests

- A
- AAAA

It ignores

- MX
- TXT
- CAA
- PTR
- SOA

Those records are used by other systems.

---

# Production Example

Suppose you deploy your Vulnerability Scanner.

```
scanner.kovid.dev

↓

A Record

↓

AWS Load Balancer

↓

EC2

↓

Docker

↓

Fastify
```

Email

```
kovid.dev

↓

MX

↓

Google Workspace
```

HTTPS

```
CAA

↓

Let's Encrypt
```

Everything uses DNS,

but not the same record.

---

# Common Interview Questions

### Difference between A and CNAME?

A stores an IP address.

CNAME stores another domain name.

---

### Difference between MX and A?

A points users to servers.

MX points email to mail servers.

---

### Why use TXT records?

Verification, email authentication, and metadata.

---

### Why is CAA important?

It limits which Certificate Authorities may issue certificates.

---

# Summary Table

| Record | Purpose |
|---------|----------|
| A | IPv4 Address |
| AAAA | IPv6 Address |
| CNAME | Alias |
| MX | Mail Server |
| TXT | Verification & Security |
| NS | Name Server |
| SOA | Zone Metadata |
| PTR | Reverse Lookup |
| CAA | Certificate Authority Authorization |
| SRV | Service Discovery |

---

# Key Takeaways

- DNS stores multiple record types.
- Different Internet services use different records.
- Browsers mainly use A and AAAA.
- Email relies heavily on MX and TXT.
- HTTPS benefits from CAA.
- Enterprise services often use SRV.
- Understanding record types is essential for cloud, DevOps, and cybersecurity.

---

# Next

➡ **04-Caching-and-TTL.md**