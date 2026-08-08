---
id: CTF-WE-ANAL
title: Web - Analysis
category: ctf
status: completed
difficulty: 2
summary: Learn how to perform analysis in a Web-based CTF environment.
tags:
  - ctf
  - web
  - analysis
prerequisites:
  - CTF-WE-PEXP
---

# 🌐 Web Dynamic Analysis → Analysis

## Goal
- Identify potential vulnerabilities.
- Understand how user input is processed.
- Determine trust boundaries.
- Find ways to abuse application logic.

---

# 1. Authentication Analysis

## Look For
- Login bypass
- Default credentials
- Weak passwords
- Session fixation
- Session reuse
- JWT weaknesses
- Missing MFA
- Password reset flaws

## Questions
- Can I login without credentials?
- Can I reuse another user's session?
- Can I modify the JWT?
- Can I change my role?

---

# 2. Authorization Analysis

## Look For
- IDOR
- Privilege Escalation
- Broken Access Control
- Forced Browsing
- Hidden Admin Functions

## Questions
- Can I access another user's data?
- Can I access admin pages?
- Can I change object IDs?
- Can I access resources directly?

---

# 3. Input Validation

## Look For
- SQL Injection
- XSS
- SSTI
- Command Injection
- LDAP Injection
- XXE
- NoSQL Injection

## Questions
- Is input filtered?
- Is input reflected?
- Is input executed?
- Is input stored?
- Does special character handling exist?

---

# 4. File Handling

## Look For
- File Upload
- File Download
- Path Traversal
- LFI
- RFI

## Questions
- Can I upload executable files?
- Can I change file names?
- Can I access arbitrary files?
- Can I overwrite files?

---

# 5. API Analysis

## Look For
- Missing Authentication
- Missing Authorization
- Hidden Parameters
- Excessive Data Exposure
- Mass Assignment
- Rate Limiting
- Method Abuse

## Questions
- Can I call endpoints directly?
- Can I modify JSON fields?
- Can I access undocumented APIs?

---

# 6. Session Analysis

## Look For
- Session IDs
- JWT
- Cookies
- Expiration
- Session Rotation

## Questions
- Can I steal a session?
- Can I reuse an old session?
- Can I forge a session?
- Can I modify cookie values?

---

# 7. Header Analysis

## Inspect
- Authorization
- Origin
- Referer
- Host
- User-Agent
- X-Forwarded-For

## Questions
- Does changing headers affect behavior?
- Can I spoof my identity?
- Can I bypass restrictions?

---

# 8. Business Logic

## Look For
- Missing validation
- Discount abuse
- Payment bypass
- Race Conditions
- Workflow flaws

## Questions
- Can I skip steps?
- Can I repeat actions?
- Can I abuse application logic?

---

# 9. Information Disclosure

## Look For
- Stack traces
- Debug pages
- Error messages
- Version numbers
- Source code
- Config files
- Logs

## Questions
- Is sensitive information exposed?
- Are internal paths visible?
- Are secrets leaked?

---

# 10. Client-side Analysis

## Look For
- Hidden functionality
- Disabled buttons
- Hidden API calls
- Secrets in JavaScript
- Feature flags

## Questions
- Is security enforced only on the client?
- Can hidden features be enabled?

---

# Vulnerability Checklist

□ SQL Injection

□ XSS

□ CSRF

□ SSRF

□ IDOR

□ XXE

□ LFI

□ RFI

□ SSTI

□ Command Injection

□ Open Redirect

□ Clickjacking

□ JWT

□ File Upload

□ Business Logic

□ Race Condition

□ Broken Authentication

□ Broken Authorization

□ Information Disclosure

---

# Analysis Output Checklist

✓ Possible Injection Points

✓ Authentication Weaknesses

✓ Authorization Weaknesses

✓ Sensitive Endpoints

✓ Sensitive Parameters

✓ Interesting Headers

✓ Interesting Cookies

✓ Interesting APIs

✓ Upload Vulnerabilities

✓ Download Vulnerabilities

✓ Possible Privilege Escalation

✓ Candidate Exploitation Paths


# Related Topics

- CTF-WE-PEXP — Web - Post Exploitation