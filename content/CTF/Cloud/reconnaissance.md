---
id: CTF-CL-RECON
title: Cloud - Reconnaissance
category: ctf
status: completed
difficulty: 1
summary: Learn how to perform reconnaissance in a Cloud-based CTF environment.
tags:
  - ctf
  - cloud
  - reconnaissance
connections:
  - id: CTF-CL-ENUM
    relationship: enables
---

# ☁️ Cloud → Reconnaissance

## Goal
- Identify the cloud provider.
- Identify exposed cloud services.
- Gather cloud metadata.

---

# 1. Identify Cloud Provider

## Look For
- AWS
- Azure
- GCP
- Cloudflare
- DigitalOcean
- Heroku
- Vercel
- Netlify

## Tools
- Wappalyzer
- BuiltWith
- nslookup
- dig
- whois

---

# 2. DNS & Subdomains

## Look For
- CNAME Records
- MX Records
- TXT Records
- SPF
- DKIM
- Subdomains

## Tools
- dig
- nslookup
- subfinder
- assetfinder
- amass

---

# 3. Storage Services

## Look For
- S3 Buckets
- Azure Blob Storage
- Google Cloud Storage
- Public Files

## Tools
- Browser
- Burp Suite
- Search Engines

---

# 4. Cloud Services

## Look For
- Lambda
- Cloud Functions
- App Engine
- API Gateway
- Kubernetes
- Docker
- Firebase

## Tools
- Browser
- DevTools
- Burp Suite

---

# 5. Public Information

## Look For
- GitHub
- Paste Sites
- Public Buckets
- Documentation
- API Docs

## Tools
- Google Dorks
- GitHub Search
- Wayback Machine

---

# Recon Output

✓ Cloud Provider

✓ Cloud Services

✓ Storage

✓ API Endpoints

✓ Subdomains

✓ Public Resources


# Related Topics

- CTF-CL-ENUM — Cloud - Enumeration

---

# Next

➡ **enumeration.md**