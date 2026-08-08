# RFC-001: Cyber Atlas

Status: Accepted

Version: 2.0

Author: Kovid Reddy

---

# Summary

Cyber Atlas is an interactive engineering knowledge graph designed to document the complete journey of learning computer science, software engineering, cloud computing, networking, operating systems, cybersecurity, and reverse engineering.

Knowledge is represented as interconnected nodes instead of isolated notes.

Markdown files act as the single source of truth.

---

# Motivation

Traditional notes suffer from several problems.

- Topics are isolated.
- Learning order is unclear.
- Relationships between concepts are hidden.
- Notes become difficult to revisit after several months.
- Theory rarely connects with practical implementation.

Cyber Atlas exists to solve these problems.

---

# Goals

Cyber Atlas should become

- a long-term engineering encyclopedia
- an interactive knowledge graph
- a practical learning platform
- a portfolio project
- documentation of continuous learning

Every concept should answer

> Why does this exist?

before explaining

> How does it work?

---

# Non Goals

Cyber Atlas is NOT

- a blogging platform
- an online course
- a CMS
- a Markdown editor
- a replacement for Obsidian

Markdown editing happens externally.

Cyber Atlas focuses on visualization and learning.

---

# Design Philosophy

Every technology exists because another technology had limitations.

Learning should follow history.

Example

```
Internet

↓

DNS

↓

TCP

↓

HTTP

↓

Web Servers

↓

Reverse Proxy

↓

Docker

↓

Kubernetes

↓

Cloud
```

Every lesson naturally introduces the next.

---

# Knowledge Representation

Knowledge is represented as

```
Concept

↓

Node
```

Relationships become

```
Edge
```

The graph is automatically generated.

No graph data is manually maintained.

---

# Learning Model

Every topic contains

- history
- motivation
- theory
- implementation
- debugging
- commands
- labs
- interview questions
- production examples

Learning is only complete after practical implementation.

---

# Project Principles

## Graph First

Everything should be navigable visually.

---

## Markdown First

Markdown is the only editable content format.

---

## Automation First

Search

Graph

Statistics

Progress

Relationships

should all be generated automatically.

---

## Build While Learning

Knowledge should immediately be applied.

Examples include

- Cyber Atlas
- Vulnerability Scanner
- AWS Deployments
- CTF Labs

---

# Long-Term Vision

After several years,

Cyber Atlas should represent an interconnected map of engineering knowledge rather than a collection of documents.

The project should remain maintainable,

version-controlled,

extensible,

and understandable by future contributors.

---

# Success Criteria

A new visitor should be able to

- understand the learning roadmap
- navigate visually
- follow prerequisite chains
- reproduce labs
- explore related technologies
- understand historical evolution

without external resources.

---

# Future RFCs

RFC-002

Graph System

RFC-003

Learning Template

RFC-004

Progress Tracking

RFC-005

Interactive Labs

RFC-006

AI-Assisted Learning

RFC-007

Quiz Engine

RFC-008

Timeline Visualization

RFC-009

Project Integration

RFC-010

Community Contributions