---
title: Why Containers Exist & Core Concepts
category: docker
status: in-progress
difficulty: 2
summary: Understand the environment-consistency problem that containers solve and the distinction between images, containers, runtimes, and virtual machines.
tags:
  - docker
  - containers
  - images
  - container-runtime
---

# 01 — Why Containers Exist & Core Concepts

## The problem: software depends on its environment

An application is not only its source code. It also depends on a language runtime, libraries, operating-system packages, configuration, filesystem paths, permissions, and network services.

A project may work on one machine and fail on another because those environments differ. This is the familiar "works on my machine" problem.

Before containers, teams often used manual setup scripts, dedicated servers, or virtual machines. Virtual machines provide strong isolation but each VM usually carries a complete guest operating system, which adds overhead.

Containers package an application and its user-space dependencies while sharing the host operating-system kernel. They provide process and resource isolation without requiring a separate guest kernel for every application.

## VM vs container

```mermaid
flowchart TB
  subgraph VM["Virtual machine model"]
    H1[Hardware] --> HV[Hypervisor]
    HV --> VM1[Guest OS + App A]
    HV --> VM2[Guest OS + App B]
  end
  subgraph CT["Container model"]
    H2[Hardware] --> OS[Host OS kernel]
    OS --> RT[Container runtime]
    RT --> C1[Container A: App + dependencies]
    RT --> C2[Container B: App + dependencies]
  end
```

A container is not a tiny VM. Linux containers rely on kernel mechanisms such as namespaces for isolation and cgroups for resource accounting and limits. On Windows, Docker Desktop commonly uses a Linux environment through WSL 2 to run Linux containers.

## Core vocabulary

| Term | Meaning |
|---|---|
| Docker Engine | Software used to build and run containers |
| Docker daemon | Background service that manages Docker objects |
| Docker CLI | Client used to send commands to the Engine |
| Image | Layered, mostly immutable template |
| Container | A created/running instance of an image |
| Registry | Service that stores and distributes images |
| Runtime | Component that starts and manages container processes |

## Image vs container

```mermaid
flowchart TB
  I[Image: read-only template]
  I --> A[Container A]
  I --> B[Container B]
  A --> AW[Container A writable layer]
  B --> BW[Container B writable layer]
```

One image can create many containers. Each container gets its own writable layer. Removing a container does not automatically remove the image, and important data should not be kept only in the container's writable layer.

## First verification

```powershell
docker version
docker run hello-world
docker images
docker ps -a
```

- `docker version` checks client and server versions.
- `docker run hello-world` verifies that the CLI can communicate with the Engine, retrieve an image if necessary, create a container, and execute it.
- `docker images` lists local images.
- `docker ps -a` lists running and stopped containers.

## Container lifecycle

```mermaid
stateDiagram-v2
  [*] --> Created
  Created --> Running: start
  Running --> Stopped: stop or main process exits
  Stopped --> Running: start
  Stopped --> Removed: rm
```

A container normally remains running only while its configured main process remains running. The container is not a full operating system that independently stays alive.

## Knowledge check

1. What is the difference between an image and a container?
2. Why is a container not the same thing as a virtual machine?
3. What happens to an image when a container created from it is removed?
4. Why should important database files not live only in the container writable layer?

## Related

- [[NET-001 — DNS]]
- [[NET-002 — TCP]]
- [[OS-001 — Linux Filesystem]]
- [[OS-002 — Processes]]
- [[DEV-004 — Docker & Containerization]]
