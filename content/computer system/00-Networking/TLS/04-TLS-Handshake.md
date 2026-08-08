---
id: NET-003.4
title: TLS 1.3 Handshake
category: networking
status: completed
difficulty: 4
summary: Learn how a TLS 1.3 connection is established, how shared keys are created, how certificates are verified, and when encryption actually begins.
tags:
  - networking
  - tls
  - https
  - handshake
prerequisites:
  - NET-003.3
connections:
  - id: NET-003.5
    relationship: enables
---

# TLS 1.3 Handshake

> *The TLS handshake is the process by which a client and server authenticate each other, negotiate cryptographic algorithms, establish shared session keys, and begin encrypted communication.*

---

# Overview

Before HTTPS data can be exchanged,

the client and server must

- Agree on a TLS version
- Choose cryptographic algorithms
- Verify the server's identity
- Establish shared symmetric keys

Only after these steps does encrypted communication begin.

---

# Position in the Network Stack

```
Application (HTTP)

↓

TLS

↓

TCP

↓

IP
```

The TLS handshake begins **after** the TCP three-way handshake completes.

---

# Step 0 — TCP Connection

Before TLS,

TCP establishes a reliable connection.

```
Client

↓

SYN

↓

Server

↓

SYN + ACK

↓

Client

↓

ACK
```

Only after the TCP connection reaches the **ESTABLISHED** state can TLS begin.

---

# Step 1 — ClientHello

The client initiates TLS by sending a

```
ClientHello
```

This message contains the client's capabilities.

Typical contents include

- Supported TLS versions
- Supported Cipher Suites
- Client Random
- Supported Groups (ECDHE)
- Signature Algorithms
- Extensions (SNI, ALPN)
- Client ECDHE Public Key Share

---

# Why ClientHello?

The client cannot assume

- which TLS versions
- which cipher suites
- which key exchange methods

the server supports.

ClientHello begins the negotiation.

---

# Client Random

The client generates

```
Client Random
```

for this connection only.

Purpose

- Ensures every TLS session is unique.
- Contributes entropy for key generation.
- Helps prevent replay attacks.

---

# Step 2 — ServerHello

The server replies with

```
ServerHello
```

It selects

- TLS version
- Cipher Suite
- Key Exchange Group
- Server Random
- Server ECDHE Public Key Share

Both parties now agree on the cryptographic parameters for the session.

---

# Server Random

Both sides contribute randomness.

```
Client Random

+

Server Random
```

Together,

they help derive unique session keys.

Neither side controls all of the randomness.

---

# Step 3 — ECDHE Key Exchange

The client and server exchange

only

their

ECDHE public keys.

```
Client

Private A

↓

Public A

↓

Internet

↓

Server

-------------------

Server

Private B

↓

Public B

↓

Internet

↓

Client
```

Private keys

never leave

their owners.

---

# Shared Secret

Using

their own private key

and

the other party's public key,

both sides independently compute

the same

shared secret.

```
Client

↓

Shared Secret

----------------

Server

↓

Shared Secret
```

The shared secret is never transmitted across the network.

It is used to derive symmetric session keys.

---

# Step 4 — Certificate

The server sends

its TLS certificate.

The certificate typically contains

- Domain Name
- Public Key
- Issuer
- Validity Period
- Serial Number
- Extensions
- Digital Signature

The server's private key

is **never** included.

---

# Certificate Verification

The client verifies

- Certificate Chain
- Trusted Root CA
- Domain Name
- Validity Dates
- Digital Signature
- Revocation Status (when checked)

If verification fails,

the connection is considered untrusted.

---

# Step 5 — Finished Messages

Once

- the certificate is verified,
- the shared secret is derived,
- and session keys are generated,

both sides exchange

```
Finished
```

messages.

These messages prove

that both parties successfully derived the same cryptographic keys

and

that the handshake has not been modified.

---

# Step 6 — Encrypted Application Data

Only now

does HTTPS begin.

```
HTTP Request

↓

TLS Encryption

↓

TCP

↓

Internet
```

Application data is encrypted using

symmetric encryption,

which is significantly faster than asymmetric cryptography.

---

# Handshake Timeline

```
TCP Handshake

↓

ClientHello

↓

ServerHello

↓

ECDHE Key Exchange

↓

Certificate

↓

Certificate Verification

↓

Finished

↓

Encrypted HTTP Traffic
```

---

# Why TLS Uses Both Symmetric and Asymmetric Cryptography

Asymmetric cryptography

- Authenticates the server
- Securely establishes shared secrets

Symmetric cryptography

- Encrypts application data
- Provides high performance

This hybrid approach combines strong security with efficient communication.

---

# TLS 1.3 Improvements

Compared to TLS 1.2,

TLS 1.3

- Removes obsolete algorithms
- Requires Perfect Forward Secrecy
- Reduces handshake latency
- Simplifies negotiation
- Improves security

Modern systems should prefer TLS 1.3 whenever possible.

---

# What Wireshark Shows

Before session keys exist,

Wireshark can inspect

- ClientHello
- ServerHello
- Certificate

After key derivation,

application data appears as

```
Application Data
```

without revealing the encrypted HTTP contents.

If session keys are exported from the client (for debugging),

Wireshark can decrypt the traffic.

---

# Engineering Insight

Every cryptographic primitive introduced earlier now has a specific role.

```
Certificates

↓

Authentication

──────────────────

ECDHE

↓

Shared Secret

──────────────────

Symmetric Encryption

↓

Confidentiality

──────────────────

Finished Messages

↓

Handshake Integrity
```

The TLS handshake is not a single algorithm.

It is a carefully orchestrated protocol combining multiple cryptographic techniques.

---

# Summary

- TLS begins after TCP establishes a connection.
- ClientHello starts negotiation.
- ServerHello selects cryptographic parameters.
- ECDHE establishes a shared secret.
- Certificates authenticate the server.
- Finished messages verify handshake integrity.
- Symmetric encryption protects all subsequent application data.

---

# Where You'll Use This

## Backend

- HTTPS APIs
- Web Servers

## DevOps

- Reverse Proxies
- Load Balancers
- TLS Configuration

## Cloud

- AWS ALB
- CloudFront
- ACM

## Cybersecurity

- Wireshark
- TLS Analysis
- Incident Response

## Interview

- Explain the TLS 1.3 handshake.
- What happens after ClientHello?
- Why is ECDHE used?
- When does encryption actually begin?
- What is the purpose of Finished messages?

---

# Common Mistakes

❌ Thinking TLS starts before TCP.

❌ Assuming certificates contain private keys.

❌ Believing ECDHE encrypts application data.

❌ Thinking application data is encrypted before the handshake completes.

❌ Assuming Wireshark can always decrypt HTTPS traffic.

---

# Related Topics

- NET-003.3 — Cryptography Basics
- NET-003.5 — Certificates & PKI
- WEB-001 — HTTP

---

# Next

➡ **05-Certificates-and-PKI.md**