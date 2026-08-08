---
id: CTF-SA-RECON
title: Static Analysis - Reconnaissance
category: ctf
status: completed
difficulty: 1
summary: Learn how to perform reconnaissance in a Static Analysis-based CTF environment.
tags:
  - ctf
  - static-analysis
  - reconnaissance
connections:
  - id: CTF-SA-ENUM
    relationship: enables
---

# 📱 Static Analysis → Reconnaissance

## Goal
- Identify the file type.
- Gather metadata.
- Understand the binary/application before reversing.

---

# 1. Identify File Type

## Look For
- APK
- ELF
- PE (.exe/.dll)
- Mach-O
- JAR
- DEX
- Shared Library (.so)

## Tools
- file
- Detect It Easy (DIE)
- ExifTool

---

# 2. File Metadata

## Look For
- Architecture
- Compiler
- Build Information
- Timestamp
- File Size
- Entropy
- Packer

## Tools
- ExifTool
- DIE
- PEStudio
- readelf

---

# 3. Hashes

## Generate
- MD5
- SHA1
- SHA256

## Goal
- Verify integrity
- Search online if allowed

## Tools
- sha256sum
- md5sum

---

# 4. Strings

## Look For
- flag
- secret
- admin
- password
- token
- firebase
- api
- localhost
- dev
- staging
- urls
- emails

## Tools
- strings
- floss

---

# 5. Resources

## Look For
- Images
- Icons
- XML
- Assets
- Certificates
- Config Files

## Tools
- Resource Hacker
- apktool
- jadx

---

# 6. Libraries

## Look For
- Imported Libraries
- Third-party SDKs
- Crypto Libraries
- Networking Libraries

## Tools
- ldd
- Dependency Walker
- JADX

---

# 7. Binary Protections

## Check
- PIE
- NX
- RELRO
- Stack Canary
- ASLR

## Tools
- checksec

---

# Recon Output Checklist

✓ File Type

✓ Architecture

✓ Binary Protection

✓ Libraries

✓ Resources

✓ Interesting Strings

✓ Metadata

✓ Possible Entry Point


# Related Topics

- CTF-SA-ENUM — Static Analysis - Enumeration

---

# Next

➡ **enumeration.md**