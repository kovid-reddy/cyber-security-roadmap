---
title: DNS
category: networking
status: not-started
difficulty: beginner
summary: Domain Name System — translates human-readable domain names into IP addresses. The phonebook of the internet.
connections:
  - networking/dhcp
  - networking/subnetting
  - security/active-directory
  - security/kerberos
  - security/ldap
  - networking/dnssec
tags:
  - networking
  - infrastructure
  - protocols
---

## What is DNS?

DNS (Domain Name System) is a hierarchical, distributed naming system that translates domain names like `google.com` into IP addresses like `142.250.80.46`. Without DNS, you'd have to memorize IP addresses for every website.

## How it works

1. You type `google.com` in your browser
2. Your OS checks its local cache
3. If not cached, it queries your **recursive resolver** (usually your ISP or router)
4. The resolver queries the **root nameservers** → **TLD nameservers** → **authoritative nameservers**
5. IP address is returned and cached

## Key Record Types

| Record | Purpose |
|--------|---------|
| A | Maps hostname → IPv4 |
| AAAA | Maps hostname → IPv6 |
| MX | Mail server for a domain |
| CNAME | Alias for another domain |
| TXT | Arbitrary text (SPF, DKIM) |
| PTR | Reverse lookup (IP → hostname) |

## Security Concerns

- **DNS Poisoning / Cache Poisoning** — attacker injects fake records to redirect traffic
- **DNS Enumeration** — using DNS to map an organization's infrastructure
- **DNS Tunneling** — using DNS queries to exfiltrate data or bypass firewalls

## Tools

```bash
nslookup google.com          # Basic DNS lookup
dig google.com ANY           # Detailed DNS query
dig @8.8.8.8 google.com A   # Query specific nameserver
host google.com              # Simple lookup
```

## Related Concepts

- **DNSSEC** — adds cryptographic signatures to DNS records
- **DoH (DNS over HTTPS)** — encrypts DNS queries
- **Split-horizon DNS** — different answers for internal vs external queries
