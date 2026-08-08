# Cyber Atlas Roadmap

Version: 2.0

Status: Active

---

# Purpose

This document defines the complete learning roadmap for Cyber Atlas.

The roadmap follows the historical evolution of computing rather than treating topics as isolated subjects.

Every new technology should naturally solve a limitation introduced by the previous one.

Learning should always answer:

> "Why did engineers invent this?"

before

> "How does it work?"

---

# Learning Philosophy

The roadmap is built using five principles.

- Learn chronologically
- Build while learning
- Theory + Practical
- Production-first
- Everything connects

Every completed topic should improve both knowledge and projects.

---

# Journey Overview

```

Computer Fundamentals

↓

Internet

↓

Operating Systems

↓

Networking

↓

Web

↓

Backend

↓

Databases

↓

DevOps

↓

Cloud

↓

Software Architecture

↓

Cybersecurity

↓

Advanced Systems

```

---

# Module 00 — Foundations

Goal

Understand how a computer executes software and how users reach applications.

Topics

```

CS-001  How the Internet Reaches Your Program

CS-002  DNS

CS-003  TCP

CS-004  TLS

CS-005  HTTP

CS-006  Web Servers

CS-007  Reverse Proxy

CS-008  Load Balancer

CS-009  API Gateway

```

Project

Observe an entire request from browser to server.

---

# Module 01 — Linux & Operating Systems

Goal

Understand the operating system before running applications on it.

Topics

```

OS-001  Linux Filesystem

OS-002  Processes

OS-003  Threads

OS-004  Memory

OS-005  Scheduling

OS-006  Permissions

OS-007  Users & Groups

OS-008  System Calls

OS-009  ELF

OS-010  Signals

OS-011  Services (systemd)

```

Project

Deploy and manage applications directly on Linux.

---

# Module 02 — Networking

Goal

Understand how machines communicate.

Topics

```

NET-001  IP Addressing

NET-002  Subnetting

NET-003  Routing

NET-004  Switching

NET-005  NAT

NET-006  Firewalls

NET-007  VLANs

NET-008  VPN

NET-009  Wireshark

NET-010  Packet Analysis

```

Project

Build and analyze a small virtual network.

---

# Module 03 — Web Development Internals

Goal

Understand what happens inside modern web applications.

Topics

```

WEB-001  REST

WEB-002  GraphQL

WEB-003  Authentication

WEB-004  Authorization

WEB-005  Sessions

WEB-006  Cookies

WEB-007  JWT

WEB-008  OAuth

WEB-009  API Design

WEB-010  WebSockets

```

Project

Build a production-ready authentication system.

---

# Module 04 — Backend Engineering

Goal

Learn how backend systems are designed.

Topics

```

BE-001  Node.js Runtime

BE-002  Event Loop

BE-003  Express

BE-004  Fastify

BE-005  Middleware

BE-006  Logging

BE-007  Validation

BE-008  Error Handling

BE-009  Queues

BE-010  Background Workers

```

Project

Refactor the Vulnerability Scanner backend.

---

# Module 05 — Databases

Goal

Understand persistent storage.

Topics

```

DB-001  Relational Databases

DB-002  PostgreSQL

DB-003  Indexing

DB-004  Transactions

DB-005  Isolation Levels

DB-006  Prisma

DB-007  Redis

DB-008  Caching

DB-009  Queues

```

Project

Optimize database performance.

---

# Module 06 — DevOps

Goal

Understand how software reaches production.

Topics

```

DEV-001 Git

DEV-002 GitHub

DEV-003 CI/CD

DEV-004 Docker

DEV-005 Docker Compose

DEV-006 Nginx

DEV-007 SSL

DEV-008 Monitoring

DEV-009 Logging

```

Project

Containerize every project.

---

# Module 07 — Kubernetes

Goal

Deploy distributed applications.

Topics

```

K8S-001 Containers

K8S-002 Pods

K8S-003 ReplicaSets

K8S-004 Deployments

K8S-005 Services

K8S-006 Ingress

K8S-007 ConfigMaps

K8S-008 Secrets

K8S-009 Autoscaling

K8S-010 Helm

```

Project

Deploy the Vulnerability Scanner to Kubernetes.

---

# Module 08 — Cloud Computing

Goal

Deploy globally.

Topics

```

AWS-001 IAM

AWS-002 EC2

AWS-003 VPC

AWS-004 Security Groups

AWS-005 Route53

AWS-006 Load Balancer

AWS-007 Auto Scaling

AWS-008 RDS

AWS-009 S3

AWS-010 CloudWatch

AWS-011 Lambda

AWS-012 API Gateway

AWS-013 ECS

AWS-014 EKS

```

Project

Deploy Cyber Atlas and Vulnerability Scanner to AWS.

---

# Module 09 — System Design

Goal

Understand large-scale software systems.

Topics

```

SYS-001 Scalability

SYS-002 Caching

SYS-003 Message Queues

SYS-004 Event Driven Systems

SYS-005 Microservices

SYS-006 CAP Theorem

SYS-007 Consistency

SYS-008 CDN

SYS-009 Rate Limiting

SYS-010 Distributed Systems

```

Project

Design systems inspired by Netflix, Discord, GitHub, and Uber.

---

# Module 10 — Cybersecurity

Goal

Secure everything built previously.

Topics

```

SEC-001 Linux Security

SEC-002 Web Security

SEC-003 OWASP Top 10

SEC-004 Burp Suite

SEC-005 Threat Modeling

SEC-006 Active Directory

SEC-007 Privilege Escalation

SEC-008 Cloud Security

SEC-009 Container Security

SEC-010 DevSecOps

```

Project

Secure the Vulnerability Scanner.

---

# Module 11 — Advanced Systems

Goal

Understand computers at the lowest practical level.

Topics

```

ADV-001 Assembly

ADV-002 Reverse Engineering

ADV-003 Malware Analysis

ADV-004 Memory Corruption

ADV-005 Exploit Development

ADV-006 Hypervisors

ADV-007 Linux Kernel

ADV-008 Windows Internals

```

Project

Reverse engineer a simple application and analyze memory safely in a lab environment.

---

# Learning Rules

Every topic should include:

- Historical background
- Why it exists
- Internal working
- Real-world usage
- Commands
- Configuration
- Practical implementation
- Debugging
- Interview questions
- Homework
- Mermaid diagrams
- References
- Related topics

---

# Practical Rule

Knowledge is only considered complete after:

- Theory understood
- Commands executed
- Lab completed
- Homework completed
- Related project updated

---

# Capstone Projects

- Cyber Atlas
- Vulnerability Scanner
- Personal Portfolio
- Home Lab
- AWS Infrastructure
- Kubernetes Cluster

Every module should improve at least one capstone project.

---

# Final Goal

By completing this roadmap, the learner should be able to:

- Build production-grade software
- Deploy scalable cloud applications
- Understand modern infrastructure
- Debug complex distributed systems
- Design secure architectures
- Transition confidently into backend engineering, cloud engineering, DevOps, application security, or cloud security roles.

## Roadmap Status

| Module | Progress |
|---------|----------|
| Foundations | ⬜ 0% |
| Linux | ⬜ 0% |
| Networking | ⬜ 0% |
| Web | ⬜ 0% |
| Backend | ⬜ 0% |
| Databases | ⬜ 0% |
| DevOps | ⬜ 0% |
| Kubernetes | ⬜ 0% |
| Cloud | ⬜ 0% |
| System Design | ⬜ 0% |
| Cybersecurity | ⬜ 0% |
| Advanced Systems | ⬜ 0% |
