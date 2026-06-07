---
title: DNSSEC
category: networking
status: not-started
difficulty: intermediate
summary: DNS Security Extensions add cryptographic signatures to DNS records to prevent poisoning and spoofing attacks.
connections:
  - networking/dns
  - security/cryptography
tags:
  - networking
  - security
  - cryptography
---

## What is DNSSEC?

DNSSEC adds digital signatures to DNS responses. Resolvers can verify that the response came from the authoritative nameserver and hasn't been tampered with.

## How it works

1. Zone owner signs records with a private key
2. Public key is published in DNS as a DNSKEY record
3. Resolvers validate signatures using the chain of trust
4. If validation fails → query is rejected

## What it protects against

- DNS cache poisoning
- Man-in-the-middle attacks on DNS
- Forged DNS responses

## Limitations

- Doesn't encrypt DNS (use DoH or DoT for that)
- Doesn't prevent DDoS on DNS infrastructure
- Complex to deploy and maintain
