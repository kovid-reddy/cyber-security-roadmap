---
id: CTF-WE-ENUM
title: Web - Enumeration
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform enumeration in a Web-based CTF environment.
tags:
  - ctf
  - web
  - enumeration
prerequisites:
  - CTF-WE-RECON
connections:
  - id: CTF-WE-EXPL
    relationship: enables
---

# 🌐 Web Dynamic Analysis → Enumeration

## Goal
- Discover every possible attack surface.
- Interact with every endpoint.
- Understand how the application behaves.

---

# 1. Pages

## Look For
- Hidden pages
- Admin panel
- Login/Register
- Forgot Password
- User Profile
- Dashboard
- Settings
- Search
- Upload
- Downloads

## Tools
- Browser
- Burp Suite Sitemap

---

# 2. Endpoints

## Look For
- REST APIs
- GraphQL
- Internal APIs
- Versioned APIs
- Hidden endpoints

## Methods
- Observe Network requests
- Read JavaScript
- Directory fuzzing

## Tools
- Burp Suite
- DevTools
- ffuf
- gobuster

---

# 3. Parameters

## Look For
- URL Parameters
- POST Parameters
- JSON Parameters
- Hidden Parameters
- IDs
- Tokens

## Test
- Change values
- Remove parameters
- Add new parameters
- Duplicate parameters
- Use unexpected values

## Tools
- Burp Repeater

---

# 4. HTTP Methods

## Check
- GET
- POST
- PUT
- DELETE
- PATCH
- OPTIONS
- HEAD

## Look For
- Method abuse
- Missing authorization
- Unexpected responses

## Tools
- Burp Repeater
- curl

---

# 5. Authentication

## Look For
- Login flow
- Registration
- Password reset
- MFA
- OAuth
- Session creation

## Capture
- Session Cookie
- JWT
- CSRF Token

## Tools
- Burp Suite
- DevTools

---

# 6. Authorization

## Look For
- User Roles
- Admin Routes
- User IDs
- Access Restrictions

## Test
- Change IDs
- Access admin pages
- Replay admin requests
- Remove authentication

## Tools
- Burp Repeater

---

# 7. File Uploads

## Look For
- Image upload
- PDF upload
- Avatar upload
- Import features

## Test
- Allowed extensions
- MIME validation
- File size
- Double extensions

## Tools
- Burp Suite

---

# 8. Downloads

## Look For
- File download
- Export
- Reports
- Logs

## Test
- Path traversal
- File enumeration
- ID manipulation

## Tools
- Browser
- Burp Suite

---

# 9. Cookies

## Enumerate
- Session IDs
- JWT
- CSRF
- Remember Me
- Preferences

## Look For
- Encoded data
- User IDs
- Roles

## Tools
- Browser
- Burp Suite

---

# 10. Headers

## Inspect
- Authorization
- Origin
- Referer
- Host
- User-Agent
- X-Forwarded-For
- Custom Headers

## Test
- Remove
- Modify
- Add

## Tools
- Burp Suite

---

# 11. JavaScript

## Enumerate
- API calls
- Hidden endpoints
- Secrets
- Routes
- Feature flags

## Tools
- DevTools
- Burp
- JS Beautifier

---

# 12. WebSockets

## Look For
- Messages
- Authentication
- Hidden commands

## Tools
- Burp Suite
- DevTools

---

# 13. Input Fields

## Test
- Text boxes
- Search
- Login
- Feedback
- Comments
- URL fields
- Email fields

## Look For
- Validation
- Filtering
- Reflection

## Tools
- Browser
- Burp Suite

---

# Enumeration Output Checklist

✓ Every page discovered

✓ Every endpoint mapped

✓ Every parameter identified

✓ Every HTTP method tested

✓ Every cookie inspected

✓ Every header captured

✓ Every upload point found

✓ Every download endpoint found

✓ Every API mapped

✓ Every user role identified

✓ Every authentication mechanism understood

✓ Every JavaScript file analyzed


# Related Topics

- CTF-WE-RECON — Web - Reconnaissance
- CTF-WE-EXPL — Web - Exploitation

---

# Next

➡ **exploitation.md**