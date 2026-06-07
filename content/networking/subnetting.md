---
title: Subnetting
category: networking
status: not-started
difficulty: intermediate
summary: Dividing a network into smaller sub-networks using CIDR notation, subnet masks, and address ranges.
connections:
  - networking/dns
  - networking/dhcp
  - networking/osi-model
  - networking/vlan
tags:
  - networking
  - infrastructure
---

## What is Subnetting?

Subnetting divides a large network into smaller, more manageable segments. It improves performance, security, and IP address efficiency.

## CIDR Notation

`192.168.1.0/24` means the first 24 bits are the network portion, leaving 8 bits for hosts = 256 addresses (254 usable).

| CIDR | Subnet Mask | Hosts |
|------|------------|-------|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /30 | 255.255.255.252 | 2 |

## Key Terms

- **Network address** — first address in a subnet (not usable for hosts)
- **Broadcast address** — last address (not usable for hosts)
- **Default gateway** — router that connects the subnet to other networks
