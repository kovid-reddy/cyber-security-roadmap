---
id: NET-002.5
title: Congestion Control (cwnd, Slow Start & AIMD)
category: networking
status: completed
difficulty: 4
summary: Learn how TCP detects network congestion and dynamically adjusts its sending rate using Slow Start, Congestion Window, AIMD, Fast Retransmit, Fast Recovery and modern congestion algorithms.
tags:
  - networking
  - tcp
  - congestion-control
prerequisites:
  - NET-002.4
connections:
  - id: NET-002.6
    relationship: enables
---

# TCP Congestion Control

> *Congestion Control protects the network from becoming overloaded.*

---

# The Problem

Imagine

```
Google

Netflix

AWS

GitHub

YouTube
```

all decide to transmit

```
As Fast As Possible
```

What happens?

Routers begin filling their packet queues.

Eventually

```
Queue

██████████████

FULL
```

Packets are dropped.

Latency increases.

Network performance collapses.

Congestion Control exists to prevent this.

---

# Flow Control vs Congestion Control

These are different mechanisms.

Flow Control asks

```
Can

THE RECEIVER

accept more data?
```

Congestion Control asks

```
Can

THE NETWORK

handle more traffic?
```

The sender must satisfy both.

```
Send Limit

=

min(rwnd, cwnd)
```

where

- **rwnd** = Receiver Window
- **cwnd** = Congestion Window

---

# Congestion Window (cwnd)

Unlike

```
rwnd
```

which belongs to the receiver,

```
cwnd
```

belongs to the sender.

It represents the sender's estimate of how much data the network can safely carry without becoming congested.

Example

```
rwnd = 64 KB

cwnd = 16 KB
```

Actual transmission limit

```
16 KB
```

The smaller value always wins.

---

# How Does TCP Detect Congestion?

Routers never announce

```
"I'm overloaded."
```

Instead,

they begin dropping packets.

TCP assumes

```
Packet Loss

↓

Possible Congestion
```

This isn't always true,

but it works well enough in most networks.

---

# Slow Start

Suppose a new connection begins.

Should TCP immediately send

```
10 GB
```

No.

The sender has no idea how much bandwidth is available.

TCP begins cautiously.

```
1 Packet

↓

2 Packets

↓

4 Packets

↓

8 Packets

↓

16 Packets
```

This exponential growth is called

**Slow Start**.

Despite the name,

it increases very quickly.

---

# Why Exponential Growth?

Imagine the network is completely idle.

Increasing

```
1

2

3

4
```

would waste available bandwidth.

Instead,

TCP quickly probes the network.

```
1

2

4

8

16

32
```

Once congestion appears,

the algorithm changes.

---

# Slow Start Threshold (ssthresh)

TCP remembers a value called

```
ssthresh
```

Below this threshold,

TCP uses exponential growth.

Above it,

growth becomes much slower.

```
Slow Start

↓

ssthresh

↓

Congestion Avoidance
```

This balances speed with stability.

---

# Congestion Avoidance

Instead of doubling every Round Trip Time,

TCP begins increasing approximately one Maximum Segment Size (MSS) per RTT.

Example

```
16

17

18

19

20
```

This avoids overwhelming the network.

---

# AIMD

TCP follows the principle

```
Additive Increase

Multiplicative Decrease
```

Meaning

Increase

```
16

17

18

19
```

Loss detected

↓

Reduce dramatically

```
19

↓

9
```

Then begin increasing again.

This allows multiple TCP connections to share bandwidth fairly.

---

# Fast Retransmit

Originally,

TCP waited for a timeout before retransmitting.

Timeouts are expensive.

Instead,

suppose the receiver repeatedly sends

```
ACK = 1002

ACK = 1002

ACK = 1002
```

Three Duplicate ACKs strongly suggest

byte

```
1002
```

is missing.

TCP retransmits immediately.

No timeout required.

---

# Fast Recovery

Older TCP implementations restarted from

```
1 Packet
```

after every packet loss.

Modern TCP keeps part of the congestion window,

allowing recovery without starting over completely.

This significantly improves throughput.

---

# Evolution of TCP Algorithms

```
Tahoe

↓

Reno

↓

New Reno

↓

CUBIC

↓

BBR
```

Each generation improved congestion handling.

---

# Reno

Introduced

- Fast Retransmit
- Fast Recovery

Reduced unnecessary performance loss.

---

# CUBIC

Default congestion control algorithm on modern Linux systems.

Instead of increasing linearly,

CUBIC follows a cubic growth curve,

allowing better performance on high-bandwidth, high-latency networks.

Most Linux servers today use CUBIC by default.

---

# BBR

Developed by Google.

Traditional TCP assumes

```
Packet Loss

↓

Congestion
```

BBR instead estimates

- Available Bandwidth
- Round Trip Time (RTT)

It attempts to operate at the optimal sending rate rather than waiting for packet loss as the primary signal.

This often improves performance on modern networks.

---

# Linux Example

Run

```bash
sysctl net.ipv4.tcp_congestion_control
```

Example

```
cubic
```

To see available algorithms

```bash
sysctl net.ipv4.tcp_available_congestion_control
```

Example

```
reno cubic bbr
```

---

# Real World Example

Suppose your Vulnerability Scanner downloads reports from AWS.

```
AWS

↓

Internet

↓

Linux

↓

Fastify
```

If the network becomes congested,

TCP automatically reduces

```
cwnd
```

Transmission slows temporarily,

preventing further congestion.

Neither Node.js nor your application modifies this behavior.

The kernel manages it entirely.

---

# Practical

Capture a large download using Wireshark.

Observe

- Duplicate ACKs
- Retransmissions
- RTT
- TCP Analysis Flags

These provide valuable clues when diagnosing poor network performance.

---

# Engineering Insight

Flow Control protects

```
The Receiver
```

Congestion Control protects

```
The Internet
```

Both limits apply simultaneously.

```
Maximum Send Size

=

min(rwnd, cwnd)
```

This equation explains nearly every TCP transmission decision.

---

# Summary

- Congestion Control prevents network overload.
- cwnd estimates safe network capacity.
- Slow Start rapidly discovers available bandwidth.
- Congestion Avoidance slows growth after ssthresh.
- AIMD balances efficiency and fairness.
- Fast Retransmit avoids unnecessary timeouts.
- CUBIC is the default Linux algorithm.
- BBR estimates bandwidth and RTT instead of relying primarily on packet loss.

---

# Where You'll Use This

## Developer

- High-performance APIs
- File Transfer Systems
- Streaming Applications

## DevOps

- Linux Performance Tuning
- Network Troubleshooting
- Server Optimization

## Cloud

- AWS
- Kubernetes
- Load Balancers

## Cybersecurity

- Traffic Analysis
- Performance Investigation
- Network Monitoring

## Interview

- Explain Slow Start.
- What is cwnd?
- Difference between rwnd and cwnd.
- Explain AIMD.
- Why is BBR different from Reno?

---

# Common Mistakes

❌ Thinking packet loss always means poor signal.

❌ Confusing rwnd with cwnd.

❌ Believing Slow Start is actually slow.

❌ Assuming applications control congestion algorithms.

---

# Related Topics

- NET-002.4 — Flow Control
- NET-002.6 — Connection Termination

---

# Next

➡ **06-Connection-Termination.md**