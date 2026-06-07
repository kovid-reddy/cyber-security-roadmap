---
title: PKI & Certificates
category: security
status: not-started
difficulty: intermediate
summary: Public Key Infrastructure — the framework of CAs, certificates, and policies that enables trusted encrypted communication.
connections:
  - security/cryptography
  - networking/ssl-tls
  - security/authentication
tags:
  - security
  - cryptography
---

## What is PKI?

PKI is the system of hardware, software, policies, and procedures needed to manage digital certificates. It establishes trust between parties who've never met.

## Chain of Trust

```
Root CA (self-signed, offline)
  └── Intermediate CA
        └── End-entity certificate (your website)
```

Browsers trust Root CAs baked in. Everything else derives trust from them.

## X.509 Certificate Fields

- **Subject** — who the cert belongs to
- **Issuer** — who signed it
- **Valid From / To** — validity period
- **Public Key** — the entity's public key
- **SAN (Subject Alternative Names)** — domains the cert covers
- **Signature** — CA's digital signature

## Certificate Revocation

- **CRL (Certificate Revocation List)** — list of revoked certs
- **OCSP** — real-time revocation check
- **OCSP Stapling** — server provides fresh OCSP response

## Common Attacks

- Rogue CA compromise
- Certificate transparency log monitoring (attacker watches for new certs on your domain)
- SSL stripping (downgrade HTTPS to HTTP)
