---
title: Windows
category: operating-systems
status: not-started
difficulty: beginner
summary: Microsoft's dominant desktop and server OS. Critical to understand for enterprise security — most corporate environments are Windows-based.
connections:
  - operating-systems/linux
  - security/active-directory
  - security/privilege-escalation
  - programming/powershell
tags:
  - os
  - windows
  - fundamentals
---

## Key Components for Security

- **Registry** — hierarchical database storing system/app config
- **SAM database** — stores local user password hashes
- **NTDS.dit** — Active Directory database (on DCs)
- **Event Viewer** — audit logs and security events
- **Task Scheduler** — common persistence mechanism
- **Services** — background processes, common PrivEsc vector

## Essential Commands (cmd)

```cmd
whoami /priv          # check privileges
net user              # list local users
net localgroup administrators  # admin group members
systeminfo            # OS info, hotfixes
ipconfig /all         # network config
netstat -ano          # connections with PIDs
tasklist              # running processes
sc query              # list services
reg query HKLM\SOFTWARE  # query registry
```

## PowerShell

```powershell
Get-Process           # running processes
Get-Service           # services
Get-LocalUser         # local users
Get-NetIPAddress      # IP addresses
Get-ChildItem -Hidden # hidden files
```

## Important Log Locations

- Security: `C:\Windows\System32\winevt\Logs\Security.evtx`
- System: `C:\Windows\System32\winevt\Logs\System.evtx`
- PowerShell: `C:\Windows\System32\winevt\Logs\Microsoft-Windows-PowerShell%4Operational.evtx`
