---
id: NET-001.6
title: DNS Security
category: networking
status: completed
difficulty: 3
summary: Learn how attackers abuse DNS, how defenders secure it, and why DNS security is essential for modern infrastructure.
tags:
  - networking
  - dns
  - security
  - dnssec
  - cybersecurity
prerequisites:
  - NET-001.5
connections:
  - id: NET-001.7
    relationship: enables
---

# DNS Security

> *DNS was designed for reliability, not security. Modern Internet security adds protections on top of the original protocol.*

---

# Why DNS Needs Security

Traditional DNS only answered

```
"What is the IP address?"
```

It never answered

```
"Can I trust this answer?"
```

That created opportunities for attackers to manipulate or abuse DNS.

---

# DNSSEC

DNSSEC stands for

**Domain Name System Security Extensions**

Its purpose is simple:

```
Verify

↓

Don't Trust
```

Instead of blindly accepting a DNS response,

clients can verify that the response was signed by the legitimate DNS zone.

---

## DNSSEC Provides

✅ Authenticity

✅ Integrity

It **does not** provide:

❌ Encryption

❌ Privacy

DNSSEC proves the answer is genuine—it does **not** hide it.

---

# DNS over HTTPS (DoH)

Normally DNS queries are sent in plaintext.

```
Browser

↓

DNS Query

↓

Resolver
```

Anyone on the network may be able to observe which domains are being queried.

DNS over HTTPS encrypts DNS traffic using HTTPS.

Benefits

- Better privacy
- Harder to monitor DNS traffic in transit
- Protects against some local eavesdropping

---

# DNS over TLS (DoT)

Another encrypted DNS protocol.

```
DNS

↓

TLS

↓

Resolver
```

Compared to DoH

| DoH | DoT |
|------|------|
| Uses HTTPS | Uses TLS directly |
| Port 443 | Port 853 |
| Looks like web traffic | Dedicated DNS protocol |

Both improve privacy during transport.

---

# Cache Poisoning

Imagine

```
github.com

↓

Wrong IP
```

gets stored in a resolver cache.

Future users receive the incorrect answer until the cache expires.

Modern resolvers reduce this risk using:

- Random transaction IDs
- Random source ports
- DNSSEC
- Better validation

---

# DNS Amplification

DNS responses can be much larger than DNS requests.

Attackers have abused this asymmetry by sending spoofed requests to misconfigured public resolvers, causing those resolvers to send much larger responses toward a victim.

Modern defenses include:

- Response Rate Limiting (RRL)
- Source address validation (BCP 38)
- Closing open resolvers
- Anycast infrastructure
- DDoS mitigation services

---

# DNS Tunneling

Some malware families have used DNS queries to move data because DNS traffic is commonly allowed through firewalls.

Instead of normal queries

```
google.com
```

malicious software may encode data inside unusually long or structured DNS queries.

Security teams monitor for:

- Very long subdomains
- High query volume
- Random-looking domain names
- Unusual DNS traffic patterns

---

# Subdomain Takeover

Suppose

```
blog.company.com
```

points to

```
old-service.example
```

The cloud resource is deleted,

but the DNS record remains.

If another user legitimately claims that abandoned cloud resource, they may end up controlling the subdomain.

### Prevention

- Remove stale DNS records
- Audit cloud resources
- Monitor dangling DNS entries

---

# Zone Transfers

Primary and secondary DNS servers synchronize using **zone transfers**.

If a DNS server allows unauthorized zone transfers,

it may expose information about internal hostnames and services.

In production,

zone transfers should be restricted to trusted secondary DNS servers.

---

# Email Security

DNS plays a major role in email authentication.

Important DNS records include:

- SPF
- DKIM
- DMARC

These help reduce email spoofing and improve email authenticity.

---

# Common Production Problems

### Website unreachable

Possible causes

- Incorrect A record
- Wrong NS record
- DNS propagation delay

---

### Email not working

Check

- MX
- SPF
- DKIM
- DMARC

---

### HTTPS certificate fails

Check

- CAA record
- DNS validation
- Domain ownership

---

# Security Monitoring

Modern organizations monitor

- DNS latency
- NXDOMAIN responses
- SERVFAIL responses
- DNSSEC validation failures
- Resolver health
- Query volume

DNS is monitored just like CPU, memory, and network usage.

---

# DNS Security Checklist

```
✓ DNSSEC enabled

✓ CAA configured

✓ SPF configured

✓ DKIM configured

✓ DMARC configured

✓ Zone transfers restricted

✓ No dangling DNS records

✓ Resolver protected
```

---

# How Companies Secure DNS

## Cloudflare

- DNSSEC
- Anycast
- DDoS Protection
- DNS Firewall

---

## Google

- Public DNS
- DNSSEC Validation
- Global Anycast Network

---

## AWS

- Route53 DNSSEC
- Health Checks
- Private Hosted Zones

---

## Kubernetes

- CoreDNS
- Internal Service Discovery
- Cluster DNS Policies

---

# Engineering Insight

DNS is often the **first dependency** in a network request.

If DNS fails,

the rest of your infrastructure may be healthy—

but users still can't reach your application.

---

# Where You'll Use This

## Developer

- HTTPS setup
- Domain verification
- Email configuration

## DevOps

- Route53
- Cloudflare
- DNSSEC
- Monitoring

## Cybersecurity

- DNS analysis
- Infrastructure review
- Email security
- Incident response

## Interview

- What is DNSSEC?
- Difference between DNSSEC and DoH?
- Why is CAA important?
- What is a dangling DNS record?
- Why monitor NXDOMAIN responses?

---

# Key Takeaways

- DNS was not originally designed with security in mind.
- DNSSEC provides authenticity and integrity.
- DoH and DoT encrypt DNS traffic in transit.
- Proper DNS configuration is essential for secure email.
- Monitoring DNS health is a core production responsibility.
- Modern cloud platforms provide built-in DNS security features.

---

# Next

➡ **07-Debugging-and-Labs.md**