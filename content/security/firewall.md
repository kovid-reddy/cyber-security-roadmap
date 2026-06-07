---
title: Firewall & NGFW
category: security
status: not-started
difficulty: intermediate
summary: Network security devices that filter traffic based on rules. Next-gen firewalls add deep packet inspection, IDS/IPS, and application awareness.
connections:
  - security/cia-triad
  - networking/vlan
  - security/dmz
  - security/ids-ips
tags:
  - security
  - networking
  - defense
---

## Types of Firewalls

- **Packet filtering** — checks IP/port headers only. Stateless.
- **Stateful inspection** — tracks connection state. Understands TCP handshake.
- **Application layer (proxy)** — inspects payload content
- **NGFW** — adds IPS, SSL inspection, application ID, user identity

## Key Concepts

- **Inbound rules** — traffic coming into the network
- **Outbound rules** — traffic leaving the network  
- **Default deny** — block everything, allow only what's needed (best practice)
- **Implicit deny** — last rule in a firewall policy blocks everything not explicitly permitted

## Common Bypass Techniques

- Tunneling over allowed ports (HTTP/HTTPS)
- DNS tunneling
- ICMP tunneling
- Encrypted C2 over port 443
