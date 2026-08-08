---
id: NET-001.1
title: History & Why DNS Exists
category: networking
status: completed
difficulty: 1
summary: Learn why DNS was invented, the limitations of HOSTS.TXT, and how the Domain Name System became one of the Internet's core protocols.
tags:
  - networking
  - dns
  - history
prerequisites:
  - CS-001
connections:
  - id: NET-001.2
    relationship: enables
---

# History & Why DNS Exists

> *Every technology exists because the previous solution stopped scaling.*

---

# The Problem

In the early Internet, computers communicated directly using **IP addresses**.

Example:

```text
26.0.0.73
```

Instead of:

```text
mit.edu
```

This worked when only a few hundred computers were connected.

As the Internet grew, remembering IP addresses became impossible for humans.

---

# Before DNS — HOSTS.TXT

Before DNS existed, every computer stored a file called:

```text
HOSTS.TXT
```

Example:

```text
26.0.0.73    MIT
26.0.0.74    HARVARD
26.0.0.75    NASA
```

Whenever a new computer joined the network, this file had to be updated and redistributed to every machine.

---

# Why HOSTS.TXT Failed

As the Internet expanded, HOSTS.TXT became impossible to maintain.

Problems included:

- Single centralized file
- Frequent updates
- Name conflicts
- Large file size
- Poor scalability

Engineers needed a distributed solution.

---

# Birth of DNS

In **1984**, **Paul Mockapetris** proposed the **Domain Name System (DNS)**.

Instead of one giant file, DNS introduced a **hierarchical distributed database**.

This allowed different organizations to manage different parts of the Internet independently.

Example:

```text
.
│
└── com
     │
     └── google
            │
            └── mail.google.com
```

---

# Timeline

```mermaid
timeline
    title Evolution of DNS

    1970 : HOSTS.TXT introduced
    1984 : DNS proposed (RFC 882 & RFC 883)
    1987 : RFC 1034 & RFC 1035 become DNS standards
    1998 : ICANN established
    2015 : CoreDNS project begins
```

---

# Why DNS Was Revolutionary

DNS solved three major problems:

- Distributed management instead of one central file
- Hierarchical organization of domains
- Massive scalability for the growing Internet

Without DNS, today's Internet could not support billions of users and devices.

---

# Engineering Insight

DNS **did not replace IP addresses**.

Computers still communicate using IP addresses.

DNS simply provides a human-friendly naming system that translates domain names into IP addresses.

Think of it as:

```text
Humans
      │
      ▼
Domain Name

      │ DNS

      ▼
IP Address

      │
      ▼
Computers
```

---

# Key Takeaways

- Early computers used only IP addresses.
- HOSTS.TXT was the first naming system.
- HOSTS.TXT failed because it could not scale.
- DNS was invented in 1984 by Paul Mockapetris.
- DNS is a distributed hierarchical naming system.
- Modern cloud platforms, CDNs, Kubernetes, and the Web all depend on DNS.

---

# Next

➡ **02-Resolution.md**