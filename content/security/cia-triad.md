---
title: CIA Triad
category: security
status: not-started
difficulty: beginner
summary: Confidentiality, Integrity, Availability — the three foundational principles every security decision is measured against.
connections:
  - security/cryptography
  - security/authentication
  - security/firewall
  - security/incident-response
tags:
  - security
  - fundamentals
---

## The Three Pillars

**Confidentiality** — Only authorized parties can access information
- Encryption, access controls, authentication

**Integrity** — Data is accurate and hasn't been tampered with
- Hashing, digital signatures, checksums

**Availability** — Systems are accessible when needed
- Redundancy, backups, DDoS protection

## Applying the Triad

Every security control should map to at least one pillar. When evaluating a risk or building a defense, ask: which pillar does this threaten or protect?

## Beyond CIA

Modern frameworks extend CIA with:
- **Non-repudiation** — can't deny an action was taken
- **Authenticity** — confirming the identity of a source
