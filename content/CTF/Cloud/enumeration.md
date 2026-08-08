---
id: CTF-CL-ENUM
title: Cloud - Enumeration
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform enumeration in a Cloud-based CTF environment.
tags:
  - ctf
  - cloud
  - enumeration
prerequisites:
  - CTF-CL-RECON
connections:
  - id: CTF-CL-EXPL
    relationship: enables
---

# ☁️ Cloud → Enumeration

## Goal
- Enumerate every accessible cloud resource.

---

# 1. Storage

## Enumerate
- Buckets
- Containers
- Files
- Backups
- Logs

---

# 2. APIs

## Enumerate
- REST APIs
- GraphQL
- API Gateway
- Serverless Functions

---

# 3. Containers

## Look For
- Docker
- Kubernetes
- Open Dashboards
- Registries

---

# 4. Metadata

## Look For
- Instance Metadata
- IAM Roles
- Service Accounts

---

# 5. Environment

## Look For
- Environment Variables
- Secrets
- API Keys
- Tokens

---

# 6. IAM

## Enumerate
- Users
- Roles
- Policies
- Permissions

---

# Enumeration Output

✓ Buckets

✓ APIs

✓ Containers

✓ Metadata

✓ IAM

✓ Secrets


# Related Topics

- CTF-CL-RECON — Cloud - Reconnaissance
- CTF-CL-EXPL — Cloud - Exploitation

---

# Next

➡ **exploitation.md**