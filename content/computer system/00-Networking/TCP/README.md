---
id: NET-002
title: Transmission Control Protocol (TCP)
category: networking
status: completed
difficulty: intermediate
summary: Learn how TCP transforms an unreliable IP network into a reliable byte stream through connection establishment, reliability mechanisms, flow control, congestion control, and graceful connection termination.
tags:
  - networking
  - tcp
  - transport-layer
---

# Transmission Control Protocol (TCP)

> *TCP provides reliable, ordered, error-checked delivery of data over an unreliable IP network.*

---

# Why TCP Exists

The Internet Protocol (IP) is intentionally simple.

IP only attempts to deliver packets.

It does **not** guarantee:

- Delivery
- Ordering
- Duplicate detection
- Error recovery
- Flow control
- Congestion handling

Without TCP, every application would have to solve these problems independently.

TCP provides a universal solution that every application can reuse.

---

# Mental Model

```text
Application
      │
      ▼
Socket API
      │
      ▼
TCP
      │
      ▼
IP
      │
      ▼
Ethernet / Wi-Fi
      │
      ▼
Physical Network
```

Applications never communicate directly with IP.

They communicate through **TCP sockets**, while the operating system manages the transport layer.

---

# Learning Objectives

After completing this chapter, you should be able to:

- Explain why TCP was invented.
- Describe the Three-Way Handshake.
- Explain sequence numbers and acknowledgements.
- Understand retransmissions and reliability.
- Explain Flow Control and Receive Windows.
- Explain Congestion Control and Congestion Windows.
- Understand TCP connection termination.
- Read common TCP connection states.
- Explain how production systems optimize TCP.
- Understand common TCP attacks and defenses.
- Debug TCP using Wireshark and Linux networking tools.

---

# Chapter Roadmap

| File | Topic |
|------|------|
| 01 | History & Why TCP Exists |
| 02 | Connection Establishment |
| 03 | Reliability |
| 04 | Flow Control |
| 05 | Congestion Control |
| 06 | Connection Termination |
| 07 | Production TCP |
| 08 | TCP Security |
| 09 | Debugging & Labs |

---

# Core Concepts

```text
TCP

├── Connection-Oriented
├── Reliable Delivery
├── Ordered Byte Stream
├── Error Detection
├── Flow Control
├── Congestion Control
└── Graceful Connection Termination
```

---

# TCP in the Internet Stack

```text
Application Layer
│
├── HTTP
├── HTTPS
├── SSH
├── SMTP
├── FTP
└── WebSocket
        │
        ▼
Transport Layer
│
└── TCP
        │
        ▼
Internet Layer
│
└── IP
        │
        ▼
Link Layer
│
└── Ethernet / Wi-Fi
```

---

# Where TCP Is Used

## Web Development

- HTTP
- HTTPS
- REST APIs
- GraphQL

---

## Backend Systems

- Node.js
- Fastify
- Express
- Spring Boot

---

## Databases

- PostgreSQL
- MySQL
- MongoDB
- Redis (TCP-based protocol)

---

## Cloud

- AWS ALB
- Route53 (after DNS resolution)
- EC2 communication
- Kubernetes Services

---

## DevOps

- Reverse Proxies
- Load Balancers
- Service Meshes
- Internal APIs

---

## Cybersecurity

- Packet Analysis
- Network Forensics
- Firewall Rules
- Port Scanning
- Traffic Inspection

---

# Skills You'll Gain

After completing this chapter, you'll be able to:

- Read a TCP packet capture.
- Debug failed TCP handshakes.
- Understand why retransmissions occur.
- Explain why websites feel slow.
- Understand how browsers communicate.
- Troubleshoot production networking issues.
- Understand how cloud infrastructure relies on TCP.

---

# Recommended Tools

| Tool | Purpose |
|------|---------|
| Wireshark | Packet Analysis |
| tcpdump | Packet Capture |
| ss | Socket Inspection |
| netstat | Connection Inspection |
| curl | HTTP Testing |
| nc (Netcat) | TCP Testing |
| OpenSSL | TLS Testing |

---

# Prerequisites

Complete these topics first:

- CS-001 — How the Internet Reaches Your Program
- NET-001 — DNS

---

# Related Topics

```
Internet

↓

DNS

↓

TCP

↓

TLS

↓

HTTP

↓

Web Server

↓

Application
```

---

# Summary

TCP is the protocol responsible for making Internet communication reliable.

It establishes connections, guarantees ordered delivery, manages network conditions, protects receivers from overload, and provides the transport foundation for most modern Internet applications.

---

# Next

➡ **01-History.md**