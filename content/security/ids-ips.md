---
title: IDS and IPS
category: security
status: not-started
difficulty: intermediate
summary: Intrusion Detection Systems monitor and alert. Intrusion Prevention Systems monitor and block. Both analyze traffic for known attack patterns.
connections:
  - security/firewall
  - security/cia-triad
tags:
  - security
  - defense
  - monitoring
---

## IDS vs IPS

| | IDS | IPS |
|--|-----|-----|
| Action | Alert only | Alert + Block |
| Placement | Out-of-band (tap) | Inline |
| Risk | No traffic disruption | Can block legit traffic |

## Detection Methods

**Signature-based** — matches known attack patterns. Fast, low false positives, misses zero-days.

**Anomaly-based** — detects deviations from baseline. Catches unknowns, high false positive rate.

**Heuristic** — rule-based behavioral analysis. Middle ground.

## Types

- **NIDS/NIPS** — network-based (monitors traffic)
- **HIDS/HIPS** — host-based (monitors OS events, file changes)

## Tools

- Snort, Suricata (open source NIDS/IPS)
- OSSEC, Wazuh (HIDS)
- CrowdStrike, SentinelOne (commercial EDR/HIPS)
