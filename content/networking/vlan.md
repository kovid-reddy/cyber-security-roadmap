---
title: VLAN
category: networking
status: not-started
difficulty: intermediate
summary: Virtual LANs logically segment a network into isolated broadcast domains, improving security and traffic management.
connections:
  - networking/subnetting
  - security/dmz
  - security/firewall
  - security/vlan-hopping
tags:
  - networking
  - segmentation
  - security
---

## What is a VLAN?

A VLAN creates logical network segments on the same physical switch infrastructure. Devices on different VLANs cannot communicate without a router — even if they're on the same physical switch.

## Use Cases

- Separating guest WiFi from corporate network
- Isolating IoT devices
- Segmenting Finance, HR, Engineering departments
- Creating DMZ zones

## Security Attack: VLAN Hopping

An attacker sends frames tagged with a different VLAN ID to "hop" into another VLAN. Mitigated by disabling unused ports and not using VLAN 1 as the native VLAN.
