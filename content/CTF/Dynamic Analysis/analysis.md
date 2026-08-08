---
id: CTF-DA-ANAL
title: Dynamic Analysis - Analysis
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform analysis in a Dynamic Analysis-based CTF environment.
tags:
  - ctf
  - dynamic-analysis
  - analysis
prerequisites:
  - CTF-DA-PEXP
---

# 🌐 Web Dynamic Analysis → Analysis

## Goal
Determine how the application trusts, validates and authorizes user input.

---

# Authentication

## Check
- Login
- Register
- Password Reset
- Sessions
- JWT

---

# Authorization

## Check
- IDOR
- Role Checks
- Admin Access
- Forced Browsing
- Broken Access Control

---

# Input Validation

## Test
- SQL Injection
- XSS
- SSRF
- SSTI
- XXE
- LFI
- Command Injection

---

# APIs

## Check
- Hidden Endpoints
- Missing Authentication
- Missing Authorization
- Mass Assignment
- Rate Limits

---

# Business Logic

## Check
- Workflow Bypass
- Race Conditions
- Payment Logic
- Coupon Abuse

---

# Information Disclosure

## Look For
- Error Messages
- Stack Traces
- Config Files
- Version Numbers
- Debug Pages

---

# Questions

- What can I control?
- What does the server trust?
- What does the server verify?
- Can I modify it?
- Can I bypass it?

---

# Analysis Output

✓ Candidate Vulnerabilities

✓ Trust Boundaries

✓ Attack Surface

✓ Exploitation Path


# Related Topics

- CTF-DA-PEXP — Dynamic Analysis - Post Exploitation