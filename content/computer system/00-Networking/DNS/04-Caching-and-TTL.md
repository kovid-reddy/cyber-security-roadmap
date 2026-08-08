---
id: NET-001.4
title: DNS Caching & Time To Live (TTL)
category: networking
status: completed
difficulty: 2
summary: Learn how DNS caching works, why it is essential for Internet performance, and how TTL controls cache lifetime.
tags:
  - networking
  - dns
  - caching
  - ttl
prerequisites:
  - NET-001.3
connections:
  - id: NET-001.5
    relationship: enables
---

# DNS Caching & TTL

> *Without caching, every website visit would require multiple DNS lookups, making the Internet significantly slower.*

---

# Why Cache DNS?

Imagine every user opening

```
google.com
```

If every request contacted

- Root Server
- TLD Server
- Authoritative Server

the Root DNS servers would receive billions of unnecessary requests every minute.

Caching avoids this problem.

---

# Where Is DNS Cached?

DNS isn't cached in just one place.

It is cached at multiple layers.

```mermaid
flowchart LR

Browser --> OS
OS --> Router
Router --> RecursiveResolver
RecursiveResolver --> AuthoritativeDNS
```

Every successful lookup can be stored for a period of time.

---

# Browser Cache

The browser remembers recently visited domains.

Example

```
github.com

↓

140.82.xx.xx
```

If the cached entry is still valid,

Chrome immediately uses it.

No DNS query is sent.

---

# Operating System Cache

The operating system maintains its own DNS cache.

Every application on your computer can use it.

View cache

### Windows

```powershell
ipconfig /displaydns
```

Flush cache

```powershell
ipconfig /flushdns
```

### Linux

```bash
resolvectl statistics
```

Flush cache

```bash
sudo resolvectl flush-caches
```

---

# Recursive Resolver Cache

Resolvers such as

```
8.8.8.8

1.1.1.1
```

also cache responses.

Suppose one user already resolved

```
github.com
```

The next user receives the cached answer immediately.

The resolver doesn't contact the Root or TLD servers again until the cache expires.

---

# What is TTL?

TTL stands for

**Time To Live**

Every DNS record has a TTL value.

Example

```
github.com

TTL = 300
```

Meaning

```
Cache this answer

for

300 seconds.
```

After the TTL expires,

a fresh DNS lookup is performed.

---

# TTL Example

Imagine

```
scanner.kovid.dev

↓

18.160.200.25

TTL = 60
```

Timeline

```text
0 seconds

↓

DNS Lookup

↓

Cached

↓

60 seconds

↓

Cache Expires

↓

Lookup Again
```

---

# Why TTL Matters

Suppose your application moves to a new server.

Old

```
18.160.1.10
```

New

```
52.84.45.99
```

If the TTL is

```
24 hours
```

users may continue reaching the old server for an entire day.

If the TTL is

```
60 seconds
```

the change propagates much faster.

---

# TTL Trade-Off

| Low TTL | High TTL |
|----------|-----------|
| Faster updates | Better performance |
| More DNS traffic | Fewer DNS queries |
| Higher infrastructure cost | Better caching |

Choosing the right TTL depends on how frequently your infrastructure changes.

---

# Cache Miss vs Cache Hit

## Cache Hit

```
Browser

↓

Already Cached

↓

Use IP
```

Fast.

---

## Cache Miss

```
Browser

↓

Resolver

↓

Root

↓

TLD

↓

Authoritative

↓

IP
```

Slower.

---

# Production Example

Suppose your Vulnerability Scanner runs behind an AWS Load Balancer.

```
scanner.kovid.dev

↓

Route53

↓

Load Balancer

↓

EC2
```

If you replace the Load Balancer,

TTL determines how quickly users begin reaching the new infrastructure.

---

# Common Problems

### Website works for one person but not another

Usually caused by

- Different DNS caches
- Different TTL expiration times

---

### "I changed my DNS record but nothing happened."

Most likely

the previous record is still cached.

Wait for the TTL to expire.

---

### Flushing the Cache

Sometimes developers spend hours debugging,

when the problem is simply an outdated local cache.

Always try

```powershell
ipconfig /flushdns
```

or

```bash
sudo resolvectl flush-caches
```

before assuming DNS is broken.

---

# Practical

View cache

```powershell
ipconfig /displaydns
```

Flush cache

```powershell
ipconfig /flushdns
```

Observe TTL

```bash
dig github.com
```

Look for

```
300

IN

A
```

The first number is the TTL.

---

# Engineering Insight

Caching is one of the biggest reasons the Internet feels fast.

Without DNS caching,

every webpage would require several additional network requests before the browser could even begin connecting to the server.

---

# Summary

- DNS is cached at multiple layers.
- Every cache improves performance.
- TTL determines how long a DNS record remains valid.
- Low TTL enables faster infrastructure changes.
- High TTL reduces DNS traffic.
- Understanding caching is essential for debugging DNS issues.

---

# Where You'll Use This

## Developer

- Domain migrations
- Cloudflare
- AWS Route53

## DevOps

- Load Balancer migrations
- Blue-Green Deployments
- Disaster Recovery

## Cybersecurity

- DNS cache analysis
- Incident response
- Infrastructure troubleshooting

## Interview

- What is TTL?
- Why cache DNS?
- Why might two users receive different IP addresses?

---

# Next

➡ **05-Production-DNS.md**