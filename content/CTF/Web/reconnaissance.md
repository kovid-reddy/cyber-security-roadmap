---
id: CTF-WE-RECON
title: Web - Reconnaissance
category: ctf
status: completed
difficulty: 1
summary: Learn how to perform reconnaissance in a Web-based CTF environment.
tags:
  - ctf
  - web
  - reconnaissance
connections:
  - id: CTF-WE-ENUM
    relationship: enables
---

# 🌐 Web Dynamic Analysis → Reconnaissance

## Goal
- Identify the technology stack
- Map the attack surface
- Gather as much information as possible without exploiting anything

---

# 1. View Source

## Look For
- HTML comments
- Hidden endpoints
- API URLs
- Secrets
- Debug comments
- Hidden forms
- Hidden inputs
- Developer notes

## Tools
- Browser (Ctrl+U)
- DevTools → Elements

---

# 2. JavaScript Analysis

## Look For
- API endpoints
- API keys
- Firebase configs
- Tokens
- Secrets
- Admin routes
- Hidden functionality
- Comments
- Source maps
- WebSocket URLs

## Search Keywords
flag
secret
password
admin
token
jwt
api
firebase
localhost
dev
staging
test
todo
key

## Tools
- Browser
- DevTools → Sources
- Burp Suite
- JS Beautifier

---

# 3. HTTP Headers

## Look For
- Server
- X-Powered-By
- CSP
- CORS
- Security Headers
- Cookies
- Cache-Control
- HSTS

## Tools
- Burp Suite
- curl -I
- DevTools → Network

---

# 4. Cookies

## Look For
- Session IDs
- JWTs
- User IDs
- Roles
- Expiration
- HttpOnly
- Secure
- SameSite

## Tools
- Browser Storage
- Burp Suite

---

# 5. HTTP Requests

## Look For
- Hidden APIs
- POST requests
- JSON bodies
- Parameters
- Headers
- Authentication tokens
- WebSockets

## Tools
- Burp Proxy
- DevTools → Network

---

# 6. robots.txt

## Look For
- Hidden directories
- Admin pages
- Backup folders
- Private endpoints

## Tools
- Browser
- curl

---

# 7. sitemap.xml

## Look For
- Hidden pages
- Old endpoints
- API paths

## Tools
- Browser

---

# 8. Directory Enumeration

## Look For
- Admin panels
- Login pages
- Uploads
- Backups
- Config files
- APIs
- Swagger
- GraphQL

## Tools
- ffuf
- gobuster
- dirsearch
- feroxbuster

---

# 9. Technology Fingerprinting

## Identify
- Framework
- Backend
- CMS
- Libraries
- CDN
- WAF

## Tools
- Wappalyzer
- WhatWeb
- BuiltWith
- httpx

---

# 10. DNS Enumeration

## Look For
- Subdomains
- CNAMEs
- TXT Records
- MX Records
- SPF
- DKIM

## Tools
- dig
- nslookup
- amass
- subfinder
- assetfinder

---

# 11. TLS / SSL

## Look For
- Certificate names
- SANs
- Expiration
- Wildcard domains

## Tools
- openssl
- SSL Labs
- Browser Certificate Viewer

---

# 12. Search Engines (Passive Recon)

## Look For
- GitHub leaks
- Paste sites
- Old URLs
- Cached pages
- Public documents

## Tools
- Google Dorks
- GitHub Search
- Wayback Machine
- Shodan (if IP provided)

---

# Recon Output Checklist

✓ Technology Stack

✓ Framework

✓ Backend

✓ Server

✓ Hidden Endpoints

✓ API Routes

✓ JavaScript Files

✓ Cookies

✓ Headers

✓ Authentication Method

✓ Admin Pages

✓ Upload Points

✓ Parameters

✓ Directories

✓ Subdomains

✓ Third-party Services

✓ Firebase

✓ Cloud Provider

✓ Interesting Files

✓ Possible Secrets


# Related Topics

- CTF-WE-ENUM — Web - Enumeration

---

# Next

➡ **enumeration.md**