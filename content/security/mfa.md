---
title: MFA & 2FA
category: security
status: not-started
difficulty: beginner
summary: Multi-factor authentication adds layers beyond passwords — something you have or something you are.
connections:
  - security/authentication
  - security/cia-triad
tags:
  - security
  - identity
---

## Why MFA matters

Passwords alone are insufficient. Credential stuffing, phishing, and data breaches compromise passwords constantly. MFA stops most account takeover attacks even when the password is known.

## MFA Methods (strongest to weakest)

1. **Hardware security keys** (FIDO2/WebAuthn) — phishing-resistant
2. **Authenticator apps** (TOTP) — Google Authenticator, Authy
3. **Push notifications** — vulnerable to MFA fatigue attacks
4. **SMS OTP** — vulnerable to SIM swapping
5. **Email OTP** — depends on email account security

## MFA Fatigue Attack

Attacker spams push notifications until the user approves out of frustration. Mitigated by number matching and additional context in push notifications.
