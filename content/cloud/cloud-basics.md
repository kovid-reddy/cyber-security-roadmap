---
title: Cloud Fundamentals
category: cloud
status: not-started
difficulty: beginner
summary: Cloud computing models, service types, deployment options, and the shared responsibility model that defines who secures what.
connections:
  - cloud/aws
  - cloud/iac
  - security/cia-triad
tags:
  - cloud
  - fundamentals
---

## Service Models

| Model | You manage | Provider manages | Example |
|-------|-----------|-----------------|---------|
| IaaS | OS, apps, data | Hardware, network | AWS EC2 |
| PaaS | Apps, data | OS, runtime, infra | Heroku, App Engine |
| SaaS | Data, access | Everything else | Gmail, Slack |

## Deployment Models

- **Public** — shared infrastructure (AWS, Azure, GCP)
- **Private** — dedicated infrastructure (on-prem or hosted)
- **Hybrid** — mix of both

## Shared Responsibility Model

The provider secures "of" the cloud. You secure "in" the cloud.

- **Provider**: physical datacenter, hypervisor, core network
- **Customer**: IAM, data encryption, OS patching, app security

Most cloud breaches are customer misconfigurations, not provider failures.

## Top Cloud Misconfigurations

- Public S3 buckets with sensitive data
- Overly permissive IAM policies
- No MFA on root/admin accounts
- Unencrypted data at rest
- Open security group rules (0.0.0.0/0)
