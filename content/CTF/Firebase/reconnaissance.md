---
id: CTF-FB-RECON
title: Firebase - Reconnaissance
category: ctf
status: completed
difficulty: 1
summary: Learn how to perform reconnaissance in a Firebase-based CTF environment.
tags:
  - ctf
  - firebase
  - reconnaissance
connections:
  - id: CTF-FB-ENUM
    relationship: enables
---

# 🔥 Firebase → Reconnaissance

Find firebaseConfig
        ↓
Identify Services
        ↓
Authentication?
        ↓
Read Rules
        ↓
Test Read
        ↓
Test Write
        ↓
Enumerate Collections
        ↓
Enumerate Storage
        ↓
Enumerate Cloud Functions
        ↓
Capture Flag

## Goal
- Identify Firebase usage.
- Collect project information.
- Determine which Firebase services are being used.

---

# 1. Identify Firebase

## Look For
- firebaseConfig
- initializeApp()
- firebase.initializeApp()
- GoogleService-Info.plist (iOS)
- google-services.json (Android)

## Tools
- Browser DevTools
- View Source
- JavaScript Files
- JADX (APK)
- apktool

---

# 2. Collect Firebase Config

## Look For
- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId
- measurementId
- databaseURL

## Goal
- Identify the Firebase project.

---

# 3. Identify Services

## Look For
- Authentication
- Firestore
- Realtime Database
- Cloud Storage
- Cloud Functions
- Firebase Hosting
- Remote Config
- Cloud Messaging

## Tools
- JavaScript
- APK
- Network Requests

---

# 4. Network Analysis

## Look For
- Firebase Requests
- Firestore API Calls
- Storage Requests
- Authentication Requests

## Tools
- Burp Suite
- Browser DevTools

---

# Recon Output Checklist

✓ Project ID

✓ Database URL

✓ Storage Bucket

✓ API Key

✓ Services Used

✓ Authentication Method


# Related Topics

- CTF-FB-ENUM — Firebase - Enumeration

---

# Next

➡ **enumeration.md**