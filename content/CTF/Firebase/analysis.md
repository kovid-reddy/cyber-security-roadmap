---
id: CTF-FB-ANAL
title: Firebase - Analysis
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform analysis in a Firebase-based CTF environment.
tags:
  - ctf
  - firebase
  - analysis
prerequisites:
  - CTF-FB-PEXP
---

# 🔥 Firebase → Analysis

## Goal
- Identify Firebase misconfigurations.

---

# 1. Security Rules

## Check
- Read Permission
- Write Permission
- Update Permission
- Delete Permission

---

# 2. Authentication

## Questions
- Is authentication required?
- Is anonymous login enabled?
- Can authentication be bypassed?

---

# 3. Firestore

## Test
- Read Documents
- Write Documents
- Update Documents
- Delete Documents

---

# 4. Realtime Database

## Test
- Read Data
- Write Data
- Create Nodes
- Delete Nodes

---

# 5. Storage

## Test
- Upload Files
- Download Files
- Delete Files
- Overwrite Files

---

# 6. Cloud Functions

## Check
- Missing Authentication
- Missing Authorization
- Input Validation

---

# Questions

Can I read?

Can I write?

Can I overwrite?

Can I delete?

Can I upload?

Can I create an admin?

Can I access hidden collections?

---

# Analysis Output

✓ Weak Rules

✓ Public Resources

✓ Anonymous Access

✓ Writable Resources

✓ Exploitation Path


# Related Topics

- CTF-FB-PEXP — Firebase - Post Exploitation