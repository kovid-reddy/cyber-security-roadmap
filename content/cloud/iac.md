---
title: Infrastructure as Code
category: cloud
status: not-started
difficulty: intermediate
summary: Managing and provisioning infrastructure through code rather than manual processes — Terraform, CloudFormation, Ansible.
connections:
  - cloud/cloud-basics
  - cloud/aws
tags:
  - cloud
  - automation
  - devops
---

## What is IaC?

IaC treats infrastructure configuration like software — version controlled, reviewed, tested, and deployed automatically. Eliminates "it works on my machine" and config drift.

## Tools

| Tool | Use |
|------|-----|
| Terraform | Multi-cloud, declarative |
| CloudFormation | AWS-native, JSON/YAML |
| Pulumi | IaC with real programming languages |
| Ansible | Configuration management |
| Helm | Kubernetes package management |

## Security Benefits

- **Auditability** — git history of all infrastructure changes
- **Consistency** — no manual snowflake configs
- **Scanning** — tools like Checkov, tfsec scan for misconfigs before deploy
- **Immutable infra** — replace rather than patch, reduces drift

## Security Risks

- Secrets hardcoded in IaC files (use Vault/Secrets Manager)
- Overly permissive policies for convenience
- Terraform state files contain sensitive data
