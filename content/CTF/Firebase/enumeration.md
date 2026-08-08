---
id: CTF-FB-ENUM
title: Firebase - Enumeration
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform enumeration in a Firebase-based CTF environment.
tags:
  - ctf
  - firebase
  - enumeration
prerequisites:
  - CTF-FB-RECON
connections:
  - id: CTF-FB-EXPL
    relationship: enables
---

# 🔥 Firebase → Enumeration

## Goal
- Enumerate every accessible Firebase resource.

---

# 1. Authentication

## Check
- Anonymous Login
- Email/Password
- Google Login
- GitHub Login
- Phone Login

---

# 2. Firestore

## Enumerate
- Collections
- Documents
- Nested Collections

## Look For
- users
- admins
- notes
- messages
- config
- secrets
- flags

---

# 3. Realtime Database

## Enumerate
- Root
- Child Nodes
- Nested Data

## Look For
- users
- admins
- passwords
- notes
- flags

---

# 4. Storage

## Enumerate
- Images
- Documents
- ZIP Files
- APKs
- Logs
- Backups

---

# 5. Cloud Functions

## Look For
- Public Functions
- HTTP Triggers
- Hidden Endpoints

---

# 6. Hosting

## Look For
- Hidden Files
- JavaScript
- Source Maps
- Debug Files

---

# Enumeration Output

✓ Collections

✓ Documents

✓ Storage Files

✓ Public Functions

✓ Public Resources


# Related Topics

- CTF-FB-RECON — Firebase - Reconnaissance
- CTF-FB-EXPL — Firebase - Exploitation

---

# Next

➡ **exploitation.md**