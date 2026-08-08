---
id: NET-002.8
title: TCP Security (SYN Floods, SYN Cookies & Stateful Firewalls)
category: networking
status: completed
difficulty: 4
summary: Learn how attackers abuse TCP and how modern operating systems, firewalls and cloud providers defend against common TCP-based attacks.
tags:
  - networking
  - tcp
  - security
prerequisites:
  - NET-002.7
connections:
  - id: NET-002.9
    relationship: enables
---

# TCP Security

> *Every protocol can be abused. Understanding TCP security begins with understanding how attackers exploit normal TCP behavior and how modern systems defend against it.*

---

# Why Attack TCP?

Most Internet services begin with a TCP connection.

Before an attacker reaches

- HTTP
- HTTPS
- SSH
- PostgreSQL

they first interact with TCP.

If TCP can be disrupted,

every application built on top of it is affected.

---

# SYN Flood

TCP connections begin with

```
Client

↓

SYN

↓

SYN ACK

↓

ACK
```

The attacker intentionally sends

```
SYN

SYN

SYN

SYN
```

but never completes

the handshake.

The server waits

for acknowledgements

that never arrive.

---

# Half-Open Connections

After receiving

```
SYN
```

the kernel creates

a temporary connection.

State

```
SYN_RECEIVED
```

These are called

**Half-Open Connections.**

Every one consumes

kernel resources.

---

# SYN Backlog

Half-open connections

are stored inside

the

```
SYN Backlog
```

```
Incoming SYN

↓

SYN Backlog

↓

Handshake Complete

↓

Accept Queue

↓

Application
```

If the backlog fills,

new connection requests

may be dropped.

---

# Denial of Service

Suppose

one million

fake SYN packets arrive.

```
Kernel

↓

SYN_RECEIVED

↓

Memory Allocation

↓

Backlog Full
```

Legitimate users

cannot establish

new TCP connections.

The application itself

may still be running,

but nobody can reach it.

---

# SYN Cookies

Instead of immediately

allocating memory,

Linux can generate

a

```
SYN Cookie
```

The cookie is encoded

inside the server's

Initial Sequence Number.

Only after the client

returns

the final ACK

does Linux create

the actual TCP connection.

This significantly reduces

resource exhaustion.

---

# Why SYN Cookies Work

Traditional TCP

```
Receive SYN

↓

Allocate Memory

↓

Wait
```

SYN Cookies

```
Receive SYN

↓

Generate Cookie

↓

Wait

↓

Allocate Memory

(Only After Valid ACK)
```

Much harder to exhaust

server memory.

---

# IP Spoofing

Attackers can forge

the

```
Source IP
```

inside

a SYN packet.

The server replies

to the fake address,

while the attacker

never intends

to receive the response.

This makes

SYN Flood attacks

more difficult to trace.

---

# RST Attack

RST means

```
Terminate Immediately
```

If a valid RST packet

belongs to an existing

TCP connection,

the receiver

immediately closes it.

Modern TCP implementations

verify sequence numbers,

making blind RST attacks

far more difficult.

---

# Session Hijacking (Concept)

Every TCP connection

contains

```
Sequence Numbers
```

If an attacker could

correctly predict

or observe

those sequence numbers,

they might attempt

to inject packets

into an existing session.

Modern systems reduce

this risk through

- Random Initial Sequence Numbers
- TCP validation
- TLS encryption

---

# Why TLS Matters

TCP guarantees

```
Reliable Delivery
```

It does **not**

provide

```
Encryption

Authentication

Confidentiality
```

TLS adds

those security properties.

Without TLS,

TCP traffic

can still be

read by anyone

who can observe it.

---

# Stateful Firewalls

Modern firewalls

don't simply block ports.

They maintain

a

```
Connection Table
```

Tracking

```
SYN

↓

ESTABLISHED

↓

FIN

↓

CLOSED
```

Unexpected packets

that don't match

an existing connection

can be dropped automatically.

---

# TCP Port Scanning

Security tools

such as

```
Nmap
```

use TCP behavior

to determine

whether ports are open.

Example

```
SYN

↓

SYN ACK

↓

Port Open
```

or

```
SYN

↓

RST

↓

Port Closed
```

A SYN Scan

never completes

the TCP handshake,

which is why

it is often called

a

**Half-Open Scan.**

---

# Cloud Protection

Modern cloud providers

add additional

network protection.

Example

```
Internet

↓

Cloudflare

↓

AWS Shield

↓

Load Balancer

↓

Linux

↓

Application
```

Multiple layers

work together

to absorb

large-scale

TCP attacks.

---

# Linux Example

View TCP security settings

```bash
sysctl net.ipv4.tcp_syncookies
```

Example

```
1
```

Meaning

SYN Cookies

are enabled.

---

# Practical

Observe

TCP states

```bash
ss -tan
```

Capture

a TCP handshake

using

Wireshark

Filter

```
tcp
```

Observe

```
SYN

↓

SYN ACK

↓

ACK
```

Compare

normal connections

with incomplete ones.

---

# Engineering Insight

TCP security

isn't provided

by one mechanism.

Modern systems rely upon

```
TCP

↓

Kernel

↓

Firewall

↓

TLS

↓

Reverse Proxy

↓

Cloud Provider
```

Security exists

through layers,

not individual features.

---

# Summary

- SYN Floods exhaust half-open connections.
- SYN Backlogs temporarily store pending connections.
- SYN Cookies reduce memory exhaustion.
- IP Spoofing complicates attack attribution.
- RST immediately terminates connections.
- TLS provides encryption—not TCP.
- Stateful Firewalls track connection state.
- Modern cloud platforms provide additional TCP protection.

---

# Where You'll Use This

## Cybersecurity

- Packet Analysis
- Network Defense
- Firewall Rules
- Incident Response

## Backend

- API Security
- Reverse Proxies
- Server Hardening

## DevOps

- Cloud Security
- Linux Networking
- Infrastructure Monitoring

## Cloud

- AWS Shield
- Cloudflare
- Security Groups

## Interview

- Explain a SYN Flood.
- What are SYN Cookies?
- Difference between FIN and RST?
- What is a Stateful Firewall?

---

# Common Mistakes

❌ Thinking TCP encrypts traffic.

❌ Confusing SYN Cookies with browser cookies.

❌ Assuming packet loss always means an attack.

❌ Believing firewalls only filter ports.

---

# Related Topics

- NET-002.7 — Production TCP
- NET-002.9 — Debugging & Labs
- NET-003 — TLS

---

# Next

➡ **09-Debugging-and-Labs.md**