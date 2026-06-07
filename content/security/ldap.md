---
title: LDAP
category: security
status: not-started
difficulty: intermediate
summary: Lightweight Directory Access Protocol — used to query and manage directory services like Active Directory.
connections:
  - security/active-directory
  - security/kerberos
  - security/authentication
  - networking/dns
tags:
  - security
  - identity
  - networking
---

## What is LDAP?

LDAP provides a standard way to access and modify directory information. Active Directory uses LDAP as its query protocol — tools like `ldapsearch` can enumerate users, groups, and policies.

## LDAP vs LDAPS

- **LDAP** — port 389, unencrypted
- **LDAPS** — port 636, encrypted with TLS
- Always use LDAPS in production

## Security Concern

Unauthenticated LDAP queries (null base bind) can expose the entire directory structure to attackers on the network.

```bash
# Enumerate AD with ldapsearch
ldapsearch -x -H ldap://dc.domain.local -b "DC=domain,DC=local"
```
