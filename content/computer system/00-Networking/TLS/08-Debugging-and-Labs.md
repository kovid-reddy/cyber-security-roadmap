---
id: NET-003.8
title: TLS Debugging & Labs
category: networking
status: completed
difficulty: 4
summary: Learn how to inspect, debug, and troubleshoot TLS connections using Wireshark, OpenSSL, curl, browser tools, and packet captures.
tags:
  - networking
  - tls
  - debugging
  - wireshark
prerequisites:
  - NET-003.7
connections:
  - id: WEB-001
    relationship: prepares
---

# TLS Debugging & Labs

> *Understanding TLS is only half the job. Engineers must also know how to inspect, debug, and troubleshoot secure connections in production.*

---

# Debugging Philosophy

Never assume

```
HTTPS is broken.
```

Instead,

debug one layer at a time.

```
DNS

↓

TCP

↓

TLS

↓

HTTP

↓

Application
```

Finding the correct layer immediately narrows the possible causes.

---

# Lab 1 — Observe a TLS Handshake

Open Wireshark.

Visit

```
https://example.com
```

Apply the display filter

```
tls
```

Observe

```
ClientHello

↓

ServerHello

↓

Certificate

↓

Finished

↓

Application Data
```

Notice that only the handshake is visible.

Application data remains encrypted.

---

# Lab 2 — Inspect the Certificate

Expand the Certificate packet.

Observe

- Subject
- Issuer
- Public Key
- Signature Algorithm
- Validity Period
- Extensions

Questions

- Which CA issued the certificate?
- When does it expire?
- Which public key algorithm is used?

---

# Lab 3 — Inspect TLS Using OpenSSL

Run

```bash
openssl s_client -connect github.com:443
```

Observe

- Certificate Chain
- TLS Version
- Cipher Suite
- Session Information

This command is one of the most useful TLS debugging tools.

---

# Lab 4 — Display Certificate Details

Retrieve the certificate

```bash
openssl s_client -connect github.com:443 -showcerts
```

Display certificate contents

```bash
openssl x509 -text
```

Observe

- Subject
- Issuer
- Validity
- SAN (Subject Alternative Names)
- Signature Algorithm

---

# Lab 5 — Test TLS Versions

Force TLS 1.3

```bash
openssl s_client -tls1_3 -connect github.com:443
```

Force TLS 1.2

```bash
openssl s_client -tls1_2 -connect github.com:443
```

Questions

- Which versions are supported?
- Which version is negotiated by default?

---

# Lab 6 — Inspect Cipher Suites

After connecting,

observe

```
Cipher

↓

TLS_AES_128_GCM_SHA256
```

Questions

- Which cipher suite was selected?
- Does it support Perfect Forward Secrecy?

---

# Lab 7 — Inspect HTTPS Requests

Run

```bash
curl -v https://github.com
```

Observe

- TLS handshake
- HTTP version
- Response headers

Notice that HTTP communication begins only after TLS negotiation completes.

---

# Lab 8 — Check Certificate Expiration

Run

```bash
openssl x509 -noout -dates
```

Observe

```
notBefore

↓

notAfter
```

Questions

- Has the certificate expired?
- How long until expiration?

---

# Lab 9 — Verify Certificate Chain

Run

```bash
openssl verify
```

Observe

```
Server Certificate

↓

Intermediate CA

↓

Root CA
```

Question

Can the browser build a complete Chain of Trust?

---

# Lab 10 — Observe Encrypted Traffic

Capture HTTPS packets in Wireshark.

Observe

```
ClientHello

↓

ServerHello

↓

Application Data
```

Question

Can you read the HTTP request?

No.

Only encrypted TLS records are visible unless session keys are provided.

---

# Lab 11 — Inspect Server Name Indication (SNI)

Open

```
ClientHello

↓

Extensions

↓

Server Name Indication
```

Observe

```
github.com
```

SNI allows one server to host multiple HTTPS websites using a single IP address.

---

# Lab 12 — Inspect ALPN

Within

```
ClientHello
```

Observe

```
ALPN

↓

h2

↓

http/1.1
```

ALPN negotiates the application protocol to use after TLS completes.

---

# Lab 13 — Verify HSTS

Run

```bash
curl -I https://github.com
```

Look for

```
Strict-Transport-Security
```

Questions

- Is HSTS enabled?
- What is the max-age?
- Are subdomains included?

---

# Lab 14 — Browser Certificate Viewer

Open

```
https://github.com
```

Click

```
🔒

↓

Connection Secure

↓

Certificate
```

Observe

- Subject
- Issuer
- Validity
- Certificate Chain
- Public Key

---

# Common TLS Errors

## Certificate Expired

```
NET::ERR_CERT_DATE_INVALID
```

Possible causes

- Expired certificate
- Incorrect system clock

---

## Unknown Certificate Authority

```
NET::ERR_CERT_AUTHORITY_INVALID
```

Possible causes

- Self-signed certificate
- Missing Intermediate Certificate
- Untrusted CA

---

## Domain Mismatch

```
NET::ERR_CERT_COMMON_NAME_INVALID
```

Possible causes

- Incorrect certificate
- Wrong hostname
- Misconfigured reverse proxy

---

## TLS Handshake Failure

Possible causes

- Unsupported TLS version
- No common cipher suite
- Certificate validation failure
- Mutual TLS required
- Firewall interference

---

# Production Troubleshooting Workflow

```
Website Doesn't Load

↓

DNS Resolution

↓

TCP Connection

↓

TLS Handshake

↓

Certificate Validation

↓

HTTP Response

↓

Application Logic
```

Never skip layers.

---

# Useful Commands

View TLS handshake

```bash
openssl s_client -connect host:443
```

View certificate dates

```bash
openssl x509 -noout -dates
```

Verbose HTTPS request

```bash
curl -v https://host
```

View HTTP headers

```bash
curl -I https://host
```

Capture HTTPS traffic

```bash
sudo tcpdump -i any port 443
```

View active TCP connections

```bash
ss -tan
```

---

# Engineering Insight

Most HTTPS failures are

not

cryptographic failures.

They are usually caused by

- Expired certificates
- Incorrect DNS
- Missing Intermediate Certificates
- Reverse proxy misconfiguration
- Incorrect TLS versions
- Invalid certificate chains

A systematic debugging approach quickly identifies the root cause.

---

# Summary

- Debug TLS layer by layer.
- Wireshark reveals handshake messages but not encrypted application data.
- OpenSSL is the primary tool for inspecting TLS.
- curl helps inspect HTTPS behavior.
- Browser tools simplify certificate inspection.
- Most TLS issues are configuration problems rather than cryptographic failures.

---

# Where You'll Use This

## Backend

- HTTPS debugging
- API troubleshooting

## DevOps

- Nginx
- HAProxy
- Kubernetes Ingress
- Load Balancers

## Cloud

- AWS ACM
- CloudFront
- Application Load Balancers

## Cybersecurity

- Wireshark
- TLS Analysis
- Incident Response
- Penetration Testing

## Interview

- How do you debug a TLS handshake?
- Which tools inspect certificates?
- Explain how Wireshark captures TLS traffic.
- How do you troubleshoot HTTPS failures?

---

# Common Mistakes

❌ Assuming HTTPS failures are always caused by TLS.

❌ Ignoring certificate chain validation.

❌ Forgetting to verify DNS before TLS.

❌ Assuming Wireshark can decrypt HTTPS without session keys.

❌ Skipping layers while troubleshooting.

---

# Related Topics

- NET-003.7 — TLS Security
- WEB-001 — HTTP

---

# Next

➡ **WEB-001 — HTTP**