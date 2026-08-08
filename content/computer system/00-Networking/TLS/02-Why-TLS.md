---
id: NET-003.2
title: Why TLS Exists
category: networking
status: completed
difficulty: 2
summary: Learn the security goals of TLS, why TCP alone is insufficient, and what TLS protects during communication.
tags:
  - networking
  - tls
  - security
prerequisites:
  - NET-003.1
connections:
  - id: NET-003.3
    relationship: enables
---

# Why TLS Exists

> *TCP guarantees reliable delivery. TLS guarantees secure delivery.*

---

# The Problem

Imagine logging into

```
https://github.com
```

Your browser sends

```
Username

Password
```

Without TLS,

those bytes travel through

- Wi-Fi
- Routers
- ISPs
- Internet Backbones

Anyone with appropriate access to the communication path could inspect the data because TCP sends application data in plaintext.

TCP solves

```
Reliable Delivery
```

It does **not** solve

- Confidentiality
- Authentication
- Integrity

A new protocol was needed.

---

# TLS Security Goals

TLS was designed to achieve four primary goals.

```
Confidentiality

↓

Integrity

↓

Authentication

↓

Perfect Forward Secrecy
```

---

# Confidentiality

**Definition**

Only the intended sender and receiver should be able to read the transmitted data.

Without TLS

```
Username

Password

Credit Card Number
```

can be read by anyone who intercepts the traffic.

With TLS

```
Encrypted Data
```

is transmitted instead.

Even if packets are captured,

the contents remain unreadable without the session keys.

---

# Integrity

**Definition**

The receiver must be able to detect whether transmitted data was modified.

Example

Original

```
Transfer ₹1,000
```

Modified

```
Transfer ₹100,000
```

TLS ensures any unauthorized modification is detected.

TCP checksums detect accidental transmission errors,

but they are **not** designed to prevent malicious tampering.

---

# Authentication

**Definition**

The client must verify that it is communicating with the legitimate server.

Without authentication,

an attacker could pretend to be

```
github.com
```

and collect passwords.

TLS uses

- Certificates
- Public Key Infrastructure (PKI)
- Certificate Authorities (CAs)

to verify server identity.

---

# Perfect Forward Secrecy (PFS)

Imagine

an attacker records

all encrypted traffic today.

Five years later,

the server's private key is stolen.

Question:

Can the attacker decrypt the old recordings?

Modern TLS says

```
No.
```

Each TLS session creates new temporary cryptographic secrets.

Compromising the server's long-term private key does **not** reveal past session keys.

---

# What TLS Does NOT Protect

TLS secures

```
Data In Transit
```

It does **not** protect against

- Weak passwords
- Malware on endpoints
- Compromised servers
- Application vulnerabilities
- SQL Injection
- Cross-Site Scripting (XSS)

Those require additional security controls.

---

# Data In Transit vs Data At Rest

Data moving across a network

```
Browser

↓

Internet

↓

Server
```

↓

**Data In Transit**

Protected by TLS.

---

Stored information

```
Database

SSD

Backup
```

↓

**Data At Rest**

Protected using

- Disk Encryption
- Database Encryption
- Access Controls

---

# CIA Triad

Cybersecurity commonly describes security using

```
Confidentiality

Integrity

Availability
```

TLS directly provides

- Confidentiality
- Integrity

It also provides

Authentication,

while Availability is achieved through infrastructure such as redundancy, load balancing, and DDoS protection.

---

# Real-World Example

Suppose your Vulnerability Scanner is deployed.

```
Browser

↓

Cloudflare

↓

AWS Load Balancer

↓

Nginx

↓

Fastify API
```

TCP ensures requests arrive reliably.

TLS ensures

- Login credentials remain confidential.
- Requests cannot be modified unnoticed.
- Users verify they're communicating with your legitimate server.
- Past sessions remain protected through Perfect Forward Secrecy.

---

# Engineering Insight

TCP and TLS solve different problems.

```
TCP

↓

Reliable Communication

────────────────────

TLS

↓

Secure Communication
```

Neither replaces the other.

Modern Internet communication depends on both.

---

# Summary

- TCP alone cannot secure Internet communication.
- TLS provides Confidentiality, Integrity, Authentication, and Perfect Forward Secrecy.
- TLS protects data while it is moving across networks.
- TLS does not replace application security or endpoint security.
- HTTPS is HTTP secured using TLS.

---

# Where You'll Use This

## Backend

- HTTPS APIs
- Authentication Systems

## DevOps

- Reverse Proxies
- Load Balancers
- Certificate Management

## Cloud

- AWS ACM
- CloudFront
- Kubernetes Ingress

## Cybersecurity

- Secure Communications
- Web Security
- Network Defense

## Interview

- Why is TLS needed if TCP already exists?
- What are the security goals of TLS?
- What is Perfect Forward Secrecy?
- What does TLS not protect against?

---

# Common Mistakes

❌ Thinking TLS only provides encryption.

❌ Confusing TCP reliability with TLS security.

❌ Assuming TLS protects compromised endpoints.

❌ Believing HTTPS secures stored database information.

---

# Related Topics

- NET-003.1 — History of TLS
- NET-003.3 — Cryptography Basics
- NET-002 — TCP

---

# Next

➡ **03-Cryptography-Basics.md**