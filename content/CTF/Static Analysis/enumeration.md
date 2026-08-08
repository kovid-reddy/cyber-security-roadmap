---
id: CTF-SA-ENUM
title: Static Analysis - Enumeration
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform enumeration in a Static Analysis-based CTF environment.
tags:
  - ctf
  - static-analysis
  - enumeration
prerequisites:
  - CTF-SA-RECON
connections:
  - id: CTF-SA-EXPL
    relationship: enables
---

# 📱 Static Analysis → Enumeration

## Goal
- Extract every useful artifact from the application.

---

# 1. Extract Files

## Look For
- APK Contents
- Resources
- Assets
- Native Libraries
- Manifest

## Tools
- apktool
- unzip
- binwalk

---

# 2. Decompiled Code

## Look For
- Main Functions
- Authentication
- Network Calls
- Encryption
- Validation
- Flag Checks

## Tools
- JADX
- Ghidra
- IDA Free

---

# 3. Search Keywords

flag

secret

password

admin

token

firebase

jwt

api

license

debug

crypto

aes

xor

base64

---

# 4. Network Endpoints

## Look For
- URLs
- APIs
- IP Addresses
- WebSockets
- Firebase Projects

## Tools
- JADX
- strings

---

# 5. Manifest Analysis (APK)

## Look For
- Exported Activities
- Services
- Receivers
- Permissions
- Backup Enabled
- Debuggable

## Tools
- apktool
- JADX

---

# 6. Assets

## Look For
- Hidden Images
- Audio
- PDFs
- Configs
- Databases

## Tools
- unzip
- apktool

---

# 7. Certificates

## Look For
- Signing Certificate
- Debug Certificate

## Tools
- keytool
- apksigner

---

# Enumeration Output

✓ Decompiled Code

✓ Interesting Functions

✓ URLs

✓ APIs

✓ Resources

✓ Config Files

✓ Certificates


# Related Topics

- CTF-SA-RECON — Static Analysis - Reconnaissance
- CTF-SA-EXPL — Static Analysis - Exploitation

---

# Next

➡ **exploitation.md**