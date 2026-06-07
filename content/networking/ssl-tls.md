---
title: SSL / TLS
category: networking
status: not-started
difficulty: intermediate
summary: Cryptographic protocols that secure communication over networks. TLS is the modern successor to SSL and is the foundation of HTTPS.
connections:
  - networking/osi-model
  - security/cryptography
  - security/certificates
  - security/pki
tags:
  - networking
  - cryptography
  - security
  - protocols
---

## SSL vs TLS

SSL is deprecated. TLS 1.2 and 1.3 are current standards. When people say "SSL" they almost always mean TLS.

## TLS Handshake (simplified)

1. Client sends supported cipher suites
2. Server picks one and sends its certificate
3. Client verifies certificate against trusted CAs
4. Both generate session keys (key exchange)
5. Encrypted communication begins

## TLS 1.3 improvements

- Fewer round trips (faster)
- Removed weak cipher suites
- Forward secrecy by default

## Common Issues

- Expired certificates → browser warnings
- Self-signed certs → not trusted by default
- Weak cipher suites → downgrade attacks
- Certificate pinning bypass attacks
