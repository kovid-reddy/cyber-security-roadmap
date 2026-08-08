---
id: CTF-DA-ENUM
title: Dynamic Analysis - Enumeration
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform enumeration in a Dynamic Analysis-based CTF environment.
tags:
  - ctf
  - dynamic-analysis
  - enumeration
prerequisites:
  - CTF-DA-RECON
connections:
  - id: CTF-DA-EXPL
    relationship: enables
---

# 🌐 Web Dynamic Analysis → Enumeration

## Goal
Discover every reachable component and every controllable input.

---

# Enumerate

## Pages

### Find
- Login
- Register
- Dashboard
- Admin
- Upload
- Download
- Profile
- Search

---

## Endpoints

### Find
- REST APIs
- GraphQL
- Hidden APIs
- Internal APIs

---

## Parameters

### Enumerate
- URL
- POST
- JSON
- IDs
- Tokens
- Hidden Fields

---

## HTTP Methods

### Test
- GET
- POST
- PUT
- PATCH
- DELETE
- OPTIONS
- HEAD

---

## Authentication

### Capture
- Session Cookie
- JWT
- CSRF Token

---

## Cookies

### Inspect
- Session
- Role
- User ID
- Preferences

---

## Headers

### Inspect
- Authorization
- Origin
- Referer
- Host
- User-Agent

---

## Upload Points

### Find
- Avatar Upload
- Import
- Documents
- Images

---

## Downloads

### Find
- Reports
- Files
- Exports
- Logs

---

## Tools

- Burp Suite
- DevTools
- ffuf
- gobuster
- feroxbuster

---

# Enumeration Output

✓ Endpoints

✓ Parameters

✓ APIs

✓ Cookies

✓ Headers

✓ Uploads

✓ Downloads

✓ Authentication Flow


# Related Topics

- CTF-DA-RECON — Dynamic Analysis - Reconnaissance
- CTF-DA-EXPL — Dynamic Analysis - Exploitation

---

# Next

➡ **exploitation.md**