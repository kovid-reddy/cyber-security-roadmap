---
id: CTF-DA-RECON
title: Dynamic Analysis - Reconnaissance
category: ctf
status: completed
difficulty: 1
summary: Learn how to perform reconnaissance in a Dynamic Analysis-based CTF environment.
tags:
  - ctf
  - dynamic-analysis
  - reconnaissance
connections:
  - id: CTF-DA-ENUM
    relationship: enables
---

# 🌐 Web Dynamic Analysis → Reconnaissance

## Goal
Identify the application's technology stack and map the attack surface before interacting with it.

---

# 1. Technology Fingerprinting

## Look For
- Frontend Framework
- Backend Framework
- Programming Language
- Web Server
- Database
- WAF
- CDN
- CMS

## Methods
- Inspect HTTP Headers
- Observe Error Pages
- Analyze JavaScript
- Fingerprint Assets

## Tools
- Wappalyzer
- WhatWeb
- Browser
- DevTools
- curl

---

# 2. Source Code

## Look For
- HTML Comments
- Hidden Forms
- Hidden Inputs
- Developer Notes
- Disabled Buttons
- Debug Code

## Methods
- View Source
- Inspect Elements

## Tools
- Browser
- DevTools

---

# 3. JavaScript Analysis

## Look For
- API Endpoints
- Hidden Routes
- Secrets
- Tokens
- Firebase Config
- Feature Flags
- Source Maps

## Methods
- Read JS
- Beautify Code
- Search Keywords

## Tools
- DevTools
- Burp Suite
- JS Beautifier

---

# 4. HTTP Headers

## Look For
- Server
- X-Powered-By
- CSP
- CORS
- Cookies
- HSTS
- Cache-Control

## Methods
- Capture Initial Request

## Tools
- Burp Suite
- curl
- DevTools

---

# 5. DNS

## Look For
- Subdomains
- CNAME
- TXT
- MX

## Methods
- Passive Enumeration

## Tools
- dig
- nslookup
- subfinder
- amass

---

# 6. Files

## Look For
- robots.txt
- sitemap.xml
- manifest.json
- security.txt
- favicon

## Methods
- Direct Requests

## Tools
- Browser
- curl

---

# Recon Output

✓ Technology Stack

✓ Framework

✓ Backend

✓ Headers

✓ Cookies

✓ JS Files

✓ APIs

✓ Interesting Files

✓ Admin Pages


# Related Topics

- CTF-DA-ENUM — Dynamic Analysis - Enumeration

---

# Next

➡ **enumeration.md**