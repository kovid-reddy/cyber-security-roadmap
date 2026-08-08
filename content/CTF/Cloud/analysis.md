---
id: CTF-CL-ANAL
title: Cloud - Analysis
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform analysis in a Cloud-based CTF environment.
tags:
  - ctf
  - cloud
  - analysis
prerequisites:
  - CTF-CL-PEXP
---

# ☁️ Cloud → Analysis

## Goal
- Identify cloud misconfigurations.
- Find exposed resources.
- Identify privilege escalation paths.

---

# 1. Storage

## Check
- Public Read
- Public Write
- Directory Listing
- Backup Files

---

# 2. IAM

## Check
- Overly Permissive Roles
- Weak Policies
- Service Accounts

---

# 3. Metadata

## Check
- Instance Metadata Access
- Temporary Credentials
- IAM Tokens

---

# 4. APIs

## Check
- Missing Authentication
- Missing Authorization
- Hidden Endpoints

---

# 5. Containers

## Check
- Open Kubernetes Dashboard
- Docker API
- Exposed Ports

---

# 6. Secrets

## Look For
- AWS Keys
- Azure Keys
- GCP Keys
- JWT Secrets
- Environment Variables

---

# Questions

Can I read?

Can I write?

Can I list?

Can I upload?

Can I access metadata?

Can I assume another role?

Can I access backups?

---

# Analysis Output

✓ Misconfigured Storage

✓ IAM Weakness

✓ Exposed Secrets

✓ Metadata Access

✓ Exploitation Path


# Related Topics

- CTF-CL-PEXP — Cloud - Post Exploitation