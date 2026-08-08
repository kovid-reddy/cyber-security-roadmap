# Graph Specification

Version: 2.0
Status: Accepted

---

# Purpose

This document defines how Cyber Atlas represents knowledge.

Every standalone Markdown file or topic folder becomes exactly one node.

Every relationship becomes exactly one edge.

The graph must always be generated automatically from Markdown.

No graph data should ever be manually edited.

---

# Philosophy

Cyber Atlas is graph-first.

Markdown is the source of truth.

Graph data is generated from Markdown.

If a Markdown file changes,

the graph changes.

---

# Graph Model

```
Markdown File
        │
        ▼
Frontmatter
        │
        ▼
Node Object
        │
        ▼
Relationship Parser
        │
        ▼
Edge Objects
        │
        ▼
Knowledge Graph
```

---

# Node Schema

A standalone Markdown file represents one node. A folder whose `README.md` contains a permanent `id` represents one parent node in the main graph. Its numbered Markdown files are chapter nodes in that topic's drill-down subgraph.

Required frontmatter

```yaml
id: CS-001

title: DNS

category: networking

status: completed

difficulty: 2

summary: Converts domain names into IP addresses.
```

---

# Complete Frontmatter

```yaml
---
id: NET-001

title: DNS

category: networking

status: completed

difficulty: 2

summary: Converts human-readable domain names into IP addresses.

estimated_time:
  theory: 60
  practical: 45
  homework: 30

tags:
  - networking
  - dns

prerequisites:
  - NET-000

unlocks:
  - NET-002
  - WEB-001

connections:

  - id: NET-002
    relationship: depends-on

  - id: WEB-001
    relationship: enables

used_in:

  - AWS Route53

  - Kubernetes CoreDNS

  - Cloudflare

projects:

  - Cyber Atlas

  - Vulnerability Scanner

references:

  - https://www.rfc-editor.org/rfc/rfc1035

labs:

  - DNS Lookup

  - Packet Capture

last_reviewed:

mastery: learning
---
```

---

# Categories

Allowed categories

```
computer-systems

networking

operating-systems

programming

backend

web

databases

cloud

docker

kubernetes

security

reverse-engineering

cryptography

certifications

ctfs

projects
```

Validation should reject unknown categories.

---

# Status

Allowed values

```
not-started

in-progress

completed

reviewing

mastered
```

---

# Difficulty

Difficulty ranges from

```
1

↓

5
```

Meaning

```
1 Beginner

2 Basic

3 Intermediate

4 Advanced

5 Expert
```

---

# Mastery

Represents personal confidence.

```
learning

comfortable

confident

mastered
```

Difficulty and mastery are independent.

Example

```
Assembly

Difficulty

5

Mastery

1
```

---

# Relationship Types

Supported relationships

```
depends-on

uses

used-by

implements

implemented-by

extends

related

secures

communicates-with

runs-on

hosts

contains

part-of

alternative-to

replaces

built-on

enables

requires
```

These should become different edge colors in the graph.

---

# Edge Schema

```
Source

↓

Relationship

↓

Destination
```

Example

```
Docker

↓

runs-on

↓

Linux
```

---

# ID Convention

Every topic has a permanent identifier.

Examples

```
CS-001

NET-003

OS-007

WEB-012

DB-005

AWS-009

SEC-021
```

IDs must never change.

Titles may change.

IDs must not.

---

# Graph Generation Rules

Every standalone Markdown file or topic folder

↓

One Node

Every connection

↓

One Edge

No duplicate edges

Ignore missing references

Warn on invalid IDs

---

# Node Appearance

Node color

↓

Category

Node glow

↓

Status

Node border

↓

Difficulty

Node size

↓

Number of connections

---

# Edge Appearance

Color

↓

Relationship Type

Width

↓

Connection Strength

Arrow

↓

Relationship Direction

---

# Search

Search should support

Title

Tags

Category

Summary

Content

Commands

Projects

References

---

# Future Features

Relationship filtering

Shortest path

Dependency tree

Topic recommendations

Learning analytics

Timeline mode

Category heatmap

Mastery heatmap

Progress dashboard

---

# Validation Rules

Reject

Duplicate IDs

Missing IDs

Unknown categories

Invalid relationships

Missing title

Missing summary

Broken frontmatter

Warn

Broken references

Circular prerequisites

Unused tags

---

# Source of Truth

Markdown files are the only editable source.

Everything else

(graph,

search,

progress,

statistics)

must be generated automatically.
