---
title: AWS
category: cloud
status: not-started
difficulty: intermediate
summary: "Amazon Web Services — the dominant cloud platform. Core services: EC2, S3, IAM, VPC, Lambda. Security is built on IAM and the shared responsibility model."
connections:
  - cloud/cloud-basics
  - cloud/iac
tags:
  - cloud
  - aws
---

## Core Security Services

| Service | Purpose |
|---------|---------|
| IAM | Identity and access management |
| VPC | Isolated virtual network |
| Security Groups | Stateful instance firewall |
| NACLs | Stateless subnet firewall |
| CloudTrail | API activity logging |
| GuardDuty | Threat detection |
| Config | Resource compliance monitoring |
| KMS | Key management |
| Secrets Manager | Store/rotate secrets |

## IAM Best Practices

- Never use root account for daily operations
- Enable MFA on all accounts, especially root
- Use roles instead of access keys where possible
- Apply least privilege — only permissions actually needed
- Rotate access keys regularly

## S3 Security

- Block all public access (unless explicitly needed)
- Enable versioning and MFA delete
- Encrypt at rest with SSE-S3 or KMS
- Use bucket policies + IAM (not just one)
- Enable CloudTrail for access logging
