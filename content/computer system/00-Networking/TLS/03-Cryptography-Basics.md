---
id: NET-003.3
title: Cryptography Basics
category: networking
status: completed
difficulty: 3
summary: Learn the fundamental cryptographic concepts that power TLS, including encryption, hashing, digital signatures, and key exchange.
tags:
  - networking
  - tls
  - cryptography
prerequisites:
  - NET-003.2
connections:
  - id: NET-003.4
    relationship: enables
---

# Cryptography Basics

> *TLS is not a single encryption algorithm. It is a protocol that combines several cryptographic techniques to achieve confidentiality, integrity, authentication, and secure key exchange.*

---

# Why Cryptography?

Imagine sending

```
Attack at dawn
```

across the Internet.

Without protection,

anyone observing the network can read or modify the message.

Cryptography protects information while it is being transmitted.

---

# Plaintext

Plaintext is the original,

human-readable data.

Examples

```
Hello World

password123

Transfer ₹500
```

Plaintext has not yet been encrypted.

---

# Ciphertext

Ciphertext is the encrypted,

unreadable version of plaintext.

```
Plaintext

↓

Encryption

↓

Ciphertext
```

Only someone with the correct cryptographic key should be able to recover the original message.

---

# Encryption

Encryption converts

plaintext

into

ciphertext

using

- an algorithm
- a cryptographic key

```
Plaintext

↓

Encryption Algorithm

+

Key

↓

Ciphertext
```

Encryption provides

**Confidentiality.**

---

# Cryptographic Key

A key is a secret value used by cryptographic algorithms.

The algorithm itself is usually public.

Only the key remains secret.

This follows

**Kerckhoffs's Principle**

> A cryptographic system should remain secure even if everything except the key is public.

---

# Symmetric Encryption

Symmetric encryption uses

one secret key

for both

encryption

and

decryption.

```
Encrypt

↓

Secret Key

↓

Decrypt
```

Examples

- AES
- ChaCha20

Advantages

- Extremely fast
- Efficient for large amounts of data

Disadvantage

The secret key must somehow be shared securely.

---

# Key Distribution Problem

Suppose Alice and Bob

have never met.

How do they obtain

the same secret key

without anyone else learning it?

Sending the key

across the Internet

would expose it.

This became known as

the

**Key Distribution Problem.**

---

# Asymmetric Encryption

Asymmetric encryption uses

two different keys.

```
Public Key

↓

Private Key
```

The keys are mathematically related.

The public key

may be shared freely.

The private key

must remain secret.

Examples

- RSA
- Elliptic Curve Cryptography (ECC)

---

# Public Key

The public key

can be distributed

to anyone.

It is commonly included inside

TLS certificates.

Knowing the public key

does **not**

allow an attacker

to calculate

the private key.

---

# Private Key

The private key

must never leave

its owner.

It is used for

- Decryption (where applicable)
- Digital Signatures
- Authentication

If stolen,

an attacker may impersonate the owner.

---

# Hash Functions

A hash function converts

input of any size

into

a fixed-size output

called a

hash

or

digest.

```
Data

↓

SHA-256

↓

Hash
```

Properties

- Deterministic
- One-way
- Fixed-length output
- Avalanche Effect

Examples

- SHA-256
- SHA-384

---

# Avalanche Effect

Changing

even one bit

of the input

produces

a completely different hash.

Example

```
Hello

↓

Hash A

----------------

hello

↓

Hash B
```

This makes unauthorized modifications easy to detect.

---

# Encryption vs Hashing

Encryption

```
Plaintext

↓

Ciphertext

↓

Decrypt

↓

Plaintext
```

Hashing

```
Plaintext

↓

Hash

↓

No Reverse
```

Hashes

cannot be decrypted.

They verify integrity,

not confidentiality.

---

# Digital Signatures

Digital Signatures provide

- Authentication
- Integrity

The sender

hashes the data

then signs

that hash

using

their

private key.

```
Data

↓

Hash

↓

Private Key

↓

Digital Signature
```

Anyone with

the sender's public key

can verify

the signature.

---

# Diffie–Hellman Key Exchange

Diffie–Hellman solves

the Key Distribution Problem.

Two computers

exchange

public values

and independently compute

the same

shared secret.

The shared secret

is never transmitted.

```
Client Public Value

↓

Internet

↓

Server

----------------

Server Public Value

↓

Internet

↓

Client

↓

Shared Secret
```

---

# ECDHE

Modern TLS commonly uses

Elliptic Curve Diffie–Hellman Ephemeral (ECDHE).

Benefits

- Faster than traditional Diffie–Hellman
- Smaller keys
- Perfect Forward Secrecy
- Widely used in TLS 1.3

---

# Perfect Forward Secrecy

Each TLS session

creates

new temporary keys.

If the server's

long-term private key

is stolen later,

previous sessions

remain secure.

---

# How TLS Uses Cryptography

TLS combines

multiple techniques,

each solving

a different problem.

```
Asymmetric Cryptography

↓

Authentication

↓

ECDHE

↓

Shared Secret

↓

Symmetric Encryption

↓

Confidentiality

↓

Hashes & Authentication

↓

Integrity
```

No single algorithm

performs every task.

---

# Real-World Example

Suppose

your browser

connects to

```
https://github.com
```

TLS uses

- Asymmetric cryptography to authenticate GitHub
- ECDHE to establish a shared secret
- Symmetric encryption to protect application data
- Hash-based authentication to detect tampering

Every HTTPS connection

combines

multiple cryptographic primitives.

---

# Engineering Insight

Modern cryptography

does not rely

on hiding algorithms.

It relies on

keeping

cryptographic keys

secret.

Algorithms such as

AES,

SHA-256,

RSA,

and

ECDHE

are public

and have been extensively analyzed by the security community.

---

# Summary

- Plaintext is readable data.
- Ciphertext is encrypted data.
- Encryption provides confidentiality.
- Symmetric encryption uses one shared key.
- Asymmetric encryption uses public and private keys.
- Hash functions verify integrity.
- Digital signatures provide authentication and integrity.
- Diffie–Hellman establishes shared secrets.
- ECDHE provides Perfect Forward Secrecy.
- TLS combines all of these techniques into one protocol.

---

# Where You'll Use This

## Backend

- HTTPS
- JWT Signing
- API Security

## DevOps

- Certificate Management
- Secure Infrastructure

## Cloud

- AWS KMS
- ACM
- Cloud Security

## Cybersecurity

- Cryptography
- PKI
- Secure Communications

## Interview

- Symmetric vs Asymmetric Encryption
- Hashing vs Encryption
- Digital Signatures
- Diffie–Hellman
- Perfect Forward Secrecy

---

# Common Mistakes

❌ Thinking hashing is encryption.

❌ Believing the public key must remain secret.

❌ Assuming Diffie–Hellman encrypts application data.

❌ Thinking TLS uses only one encryption algorithm.

❌ Confusing Digital Signatures with Encryption.

---

# Related Topics

- NET-003.2 — Why TLS Exists
- NET-003.4 — TLS Handshake
- NET-002 — TCP

---

# Next

➡ **04-TLS-Handshake.md**