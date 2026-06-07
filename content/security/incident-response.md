---
title: Incident Response
category: security
status: not-started
difficulty: intermediate
summary: The structured process for detecting, containing, and recovering from security incidents — Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.
connections:
  - security/cia-triad
  - security/firewall
  - security/authentication
tags:
  - security
  - defense
  - blue-team
---

## The 6 Phases (PICERL)

1. **Preparation** — policies, tools, training, runbooks in place before incidents happen
2. **Identification** — detect that an incident occurred. Alerts, logs, user reports.
3. **Containment** — stop the spread. Short-term (isolate host) and long-term (patch vectors).
4. **Eradication** — remove the threat. Delete malware, revoke compromised credentials.
5. **Recovery** — restore systems to normal operation. Verify integrity.
6. **Lessons Learned** — post-incident review. What went wrong? How to improve?

## Key Artifacts to Collect

- Memory dumps
- Disk images
- Network captures
- Log files (SIEM, firewall, EDR, auth logs)

## Tools

| Phase | Tools |
|-------|-------|
| Detection | Splunk, ELK, QRadar |
| Memory | Volatility, WinPmem |
| Disk | FTK Imager, Autopsy |
| Network | Wireshark, Zeek |
| EDR | CrowdStrike, SentinelOne |
