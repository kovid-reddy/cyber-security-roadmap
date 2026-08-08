---
id: NET-003.5
title: Certificates and Public Key Infrastructure (PKI)
category: networking
status: completed
difficulty: 4
summary: Learn how digital certificates, Certificate Authorities, and the Public Key Infrastructure establish trust for secure Internet communication.
tags:
  - networking
  - tls
  - pki
  - certificates
prerequisites:
  - NET-003.4
connections:
  - id: NET-003.6
    relationship: enables
---

# Certificates & Public Key Infrastructure (PKI)

> *Encryption alone cannot prove who you're communicating with. PKI establishes trust by allowing browsers to verify the identity of servers through trusted Certificate Authorities.*

---

# Why PKI Exists

Imagine you generate

```
Public Key

Private Key
```

Anyone can do that.

Question:

Does owning a key pair prove you're GitHub?

No.

A public key proves ownership of a cryptographic identity,

not a real-world identity.

Someone trusted must verify that

```
This public key belongs to github.com
```

That is the purpose of PKI.

---

# What is PKI?

Public Key Infrastructure (PKI) is the system used to

- Issue certificates
- Verify identities
- Build trust
- Revoke compromised certificates

PKI enables browsers to decide whether a TLS connection should be trusted.

---

# What is a Certificate?

A TLS certificate is a digitally signed document that binds

```
Domain Name

↓

Public Key
```

Together.

A browser trusts the certificate because it is digitally signed by a trusted Certificate Authority.

---

# Certificate Contents

A typical X.509 certificate contains

- Subject (Domain Name)
- Public Key
- Issuer
- Serial Number
- Validity Period
- Signature Algorithm
- Extensions
- Digital Signature

The certificate never contains

```
Private Key
```

The private key always remains on the server.

---

# Certificate Authority (CA)

A Certificate Authority is a trusted organization that verifies identities before issuing certificates.

Examples include

- Let's Encrypt
- DigiCert
- GlobalSign
- Sectigo

A CA signs certificates using its own private key.

Browsers verify those signatures using the CA's public key.

---

# Root Certificate Authority

At the top of PKI is the

```
Root CA
```

Root certificates are

- Self-signed
- Installed in operating systems and browsers
- Trusted by default

Examples

- ISRG Root X1
- DigiCert Global Root
- GlobalSign Root CA

Trust begins here.

---

# Intermediate Certificate Authority

Root CAs rarely issue certificates directly.

Instead,

they issue certificates to

Intermediate CAs.

```
Root CA

↓

Intermediate CA

↓

Website Certificate
```

Benefits

- Protects the Root CA
- Limits damage if an Intermediate is compromised
- Simplifies certificate management

---

# Chain of Trust

When visiting

```
https://github.com
```

the browser builds

```
Server Certificate

↓

Intermediate CA

↓

Root CA
```

Every certificate must verify successfully.

If even one certificate cannot be validated,

the browser rejects the connection.

---

# Certificate Validation

Before trusting a certificate,

the browser checks

### Domain Name

Does the certificate match the requested website?

---

### Validity Period

Has the certificate expired?

```
Not Before

↓

Not After
```

---

### Digital Signature

Was the certificate signed by the claimed issuer?

---

### Chain of Trust

Can a complete trust chain be built to a trusted Root CA?

---

### Revocation Status

Has the certificate been revoked before expiration?

---

# Certificate Revocation

Certificates may become untrusted before they expire.

Reasons include

- Private key compromise
- Incorrect issuance
- Domain ownership changes

Revocation allows browsers to reject those certificates.

---

# CRL

Certificate Revocation List

A periodically updated list of revoked certificates published by a Certificate Authority.

Browsers can check whether a certificate appears on the list.

---

# OCSP

Online Certificate Status Protocol

Instead of downloading an entire revocation list,

the browser asks the Certificate Authority

whether a certificate is still valid.

OCSP provides more current revocation information than CRLs.

---

# Self-Signed Certificates

A self-signed certificate is signed using

its own private key

instead of

a trusted Certificate Authority.

Advantages

- Free
- Useful for testing
- Suitable for internal development

Disadvantages

- Not trusted by browsers
- Generates security warnings
- No Chain of Trust

Encryption still works,

but authentication does not.

---

# Let's Encrypt

Let's Encrypt is a free Certificate Authority that automates certificate issuance and renewal.

Benefits

- Free certificates
- Automated renewal
- Trusted by modern browsers
- Widely used across the Internet

It significantly increased HTTPS adoption worldwide.

---

# Certificate Expiration

Certificates contain

```
Not Before

↓

Not After
```

Expiration limits

- Long-term exposure from compromised keys
- Outdated cryptographic practices
- Stale identity information

Modern certificates typically have relatively short validity periods.

---

# Certificate Pinning

Normally,

applications trust

any certificate

issued by a trusted Root CA.

Certificate Pinning restricts trust to

- A specific certificate
- A specific public key

Benefits

- Protects against compromised Certificate Authorities
- Reduces MITM risk

Trade-offs

- More difficult certificate rotation
- Operational complexity

---

# Private Key Protection

The server's private key is the most sensitive component of TLS.

Best practices

- Never transmit it
- Store it securely
- Restrict access
- Rotate when necessary
- Use HSMs or cloud key management services for high-security deployments

If the private key is compromised,

the certificate should be revoked immediately.

---

# Real-World Example

```
Browser

↓

GitHub Certificate

↓

Intermediate CA

↓

Root CA

↓

Trusted Connection
```

Every step must verify successfully before HTTPS continues.

---

# Engineering Insight

Certificates do not provide encryption.

Certificates provide

```
Trust
```

Encryption is performed later using symmetric session keys established during the TLS handshake.

PKI answers

```
Who am I talking to?
```

TLS encryption answers

```
Can anyone else read our conversation?
```

Together,

they create secure Internet communication.

---

# Summary

- PKI establishes trust on the Internet.
- Certificates bind identities to public keys.
- Root CAs are trusted by operating systems and browsers.
- Intermediate CAs protect Root CAs.
- Browsers validate certificates before establishing secure connections.
- Revocation mechanisms allow compromised certificates to be rejected.
- Self-signed certificates provide encryption but not browser trust.

---

# Where You'll Use This

## Backend

- HTTPS APIs
- Certificate Management
- Reverse Proxies

## DevOps

- Nginx
- HAProxy
- Kubernetes Ingress
- Let's Encrypt

## Cloud

- AWS ACM
- CloudFront
- Azure Key Vault
- Google Managed Certificates

## Cybersecurity

- PKI
- Certificate Audits
- Wireshark
- TLS Analysis

## Interview

- What is PKI?
- Explain the Chain of Trust.
- Why are Intermediate CAs used?
- What is a self-signed certificate?
- Difference between CRL and OCSP.
- Why do browsers trust Root CAs?

---

# Common Mistakes

❌ Thinking certificates contain private keys.

❌ Believing encryption automatically proves identity.

❌ Confusing Root CAs with Intermediate CAs.

❌ Assuming self-signed certificates are insecure.

❌ Thinking Let's Encrypt is less secure because it's free.

---

# Related Topics

- NET-003.4 — TLS Handshake
- NET-003.6 — TLS in Production
- WEB-001 — HTTP

---

# Next

➡ **06-Production.md**