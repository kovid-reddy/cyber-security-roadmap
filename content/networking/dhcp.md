---
title: DHCP
category: networking
status: not-started
difficulty: beginner
summary: Dynamic Host Configuration Protocol — automatically assigns IP addresses and network config to devices on a network.
connections:
  - networking/dns
  - networking/subnetting
  - networking/osi-model
tags:
  - networking
  - protocols
  - infrastructure
---

## What is DHCP?

DHCP automatically assigns IP addresses, subnet masks, default gateways, and DNS server addresses to devices on a network. Without it, every device would need manual configuration.

## DORA Process

1. **Discover** — client broadcasts "I need an IP"
2. **Offer** — server responds with an available IP
3. **Request** — client accepts the offer
4. **Acknowledge** — server confirms the lease

## Key Concepts

- **Lease time** — how long the IP assignment lasts
- **IP pool** — range of addresses the server can assign
- **Reservations** — binding a specific IP to a MAC address

## Security Concerns

- **DHCP Starvation** — attacker exhausts the IP pool with fake requests
- **Rogue DHCP Server** — attacker sets up a fake DHCP server to redirect traffic
