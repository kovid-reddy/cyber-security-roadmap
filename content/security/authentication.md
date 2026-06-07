---
title: Authentication
category: security
status: not-started
difficulty: beginner
summary: Verifying identity — Kerberos, RADIUS, LDAP, SSO, certificates, MFA, and local authentication methods.
connections:
  - security/kerberos
  - security/ldap
  - security/active-directory
  - security/mfa
  - security/cia-triad
tags:
  - security
  - identity
---

## Authentication Factors

- **Something you know** — password, PIN
- **Something you have** — token, smart card, phone
- **Something you are** — fingerprint, face, retina

## Authentication Protocols

| Protocol | Use |
|----------|-----|
| Kerberos | Windows domain (ticket-based) |
| RADIUS | Network access (VPN, WiFi) |
| LDAP | Directory queries |
| SAML | Web SSO (federated identity) |
| OAuth 2.0 | Authorization delegation |
| OIDC | Identity layer on top of OAuth |

## Authentication vs Authorization

- **Authentication** — proves who you are
- **Authorization** — determines what you can do

## Common Weaknesses

- Weak/default passwords
- Password reuse across systems
- Missing MFA on critical accounts
- Storing passwords in plaintext
