---
title: Cryptography
category: security
status: not-started
difficulty: intermediate
summary: The science of securing information through hashing, encryption, key exchange, and digital signatures.
connections:
  - security/cia-triad
  - security/pki
  - security/certificates
  - networking/ssl-tls
  - networking/dnssec
tags:
  - security
  - cryptography
---

## Core Concepts

**Hashing** — One-way transformation. Same input always produces same output. Used for passwords and integrity checks.
- MD5 (broken), SHA-1 (deprecated), SHA-256, SHA-3

**Salting** — Random data added to input before hashing. Prevents rainbow table attacks.

**Symmetric Encryption** — Same key encrypts and decrypts. Fast. Key distribution is the problem.
- AES-128, AES-256

**Asymmetric Encryption** — Public key encrypts, private key decrypts. Slower but solves key exchange.
- RSA, ECC

**Key Exchange** — Diffie-Hellman allows two parties to agree on a shared secret over an insecure channel.

## Digital Signatures

Sign with private key → verify with public key. Proves authenticity and integrity.

## Common Attacks

- **Brute force** — try all possible keys
- **Rainbow tables** — precomputed hash lookups (defeated by salting)
- **Birthday attack** — exploiting hash collisions
