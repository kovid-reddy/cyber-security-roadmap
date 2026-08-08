---
id: NET-002.4
title: Flow Control (Receive Window & Sliding Window)
category: networking
status: completed
difficulty: 3
summary: Learn how TCP prevents fast senders from overwhelming slow receivers using receive buffers, advertised windows and the sliding window mechanism.
tags:
  - networking
  - tcp
  - flow-control
prerequisites:
  - NET-002.3
connections:
  - id: NET-002.5
    relationship: enables
---

# TCP Flow Control

> *Flow Control protects the receiver from being overwhelmed by a sender that can transmit data faster than it can be processed.*

---

# The Problem

Imagine

```
Server

↓

10 Gbps
```

Client

```
↓

20 Mbps
```

The server can generate data far faster than the client can process it.

If the server keeps transmitting without limits,

the receiver's memory eventually fills.

TCP prevents this.

---

# Why Doesn't The Receiver Read Immediately?

Incoming packets do **not** go directly to the application.

Instead they first enter the kernel.

```
Network

↓

TCP

↓

Receive Buffer

↓

Application
```

Applications consume data only when the operating system schedules them.

The receiver therefore needs temporary storage.

---

# Receive Buffer

Every TCP socket owns a **Receive Buffer**.

```
Network

↓

Receive Buffer

↓

Application
```

Purpose:

- Store incoming bytes
- Handle burst traffic
- Hold out-of-order data
- Wait until the application reads data

Without this buffer,

packet loss would occur almost immediately.

---

# The Problem With A Full Buffer

Imagine

```
Receive Buffer

██████████████

100%
```

Another packet arrives.

Where should it go?

Nowhere.

The receiver has run out of space.

Instead of allowing overflow,

TCP tells the sender to slow down.

---

# Receive Window (rwnd)

Every ACK packet contains another important field.

```
Window Size
```

Example

```
ACK = 5001

Window = 32768
```

Meaning

> "I've successfully received everything up to byte 5000, and I currently have 32,768 bytes of free buffer space available."

The sender must respect this limit.

---

# Advertised Window

The receiver continuously advertises

its available buffer space.

```
Receiver

↓

ACK

↓

Window = 16384
```

As the application consumes data,

more space becomes available.

The receiver advertises a larger window.

---

# Sliding Window

Imagine

```
Allowed Bytes

0 ------------------ 9999
```

The sender may transmit any bytes inside this range.

After acknowledgements arrive,

the window moves.

```
5000 ------------------ 14999
```

The window has **slid forward**.

Hence the name

**Sliding Window**.

---

# Visualization

Initial Window

```
|=========================|
0                      9999
```

After ACK

```
          |=========================|
       5000                    14999
```

The left edge advances as old data is acknowledged.

The right edge advances as new transmission becomes allowed.

---

# Why Not Send One Packet At A Time?

Suppose the Round Trip Time (RTT) is

```
100 ms
```

Sending

```
Packet

↓

Wait

↓

ACK

↓

Packet

↓

Wait
```

would waste most of the available bandwidth.

Instead,

TCP allows many packets to be "in flight" simultaneously.

This technique is called

**Pipelining**.

---

# Window = 0

Suppose

the application temporarily stops reading data.

Eventually

```
Receive Buffer

██████████████
```

The receiver advertises

```
Window = 0
```

Meaning

> "Stop sending. I currently have no available buffer space."

The sender pauses transmission.

---

# Zero Window Probe

Question:

If the sender stopped,

how does it know

when the receiver has space again?

Normally,

the receiver sends a **Window Update**.

However,

if that update is lost,

both sides could wait forever.

TCP avoids this deadlock by sending a

**Zero Window Probe**.

The receiver replies with its current window size.

Communication resumes.

---

# Window Scaling

Originally,

TCP allocated only

```
16 bits
```

for the Window field.

Maximum possible value

```
65,535 Bytes
```

Around

```
64 KB
```

This was sufficient in the 1980s.

Modern data centers routinely operate at

```
10 Gbps

40 Gbps

100 Gbps
```

A 64 KB window would severely limit throughput.

TCP therefore introduced

**Window Scaling**,

allowing much larger receive windows.

---

# Flow Control vs Congestion Control

These concepts are often confused.

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

Different problems.

Different algorithms.

---

# Linux Example

Suppose Node.js downloads

a 2 GB file.

```
Node.js

↓

Receive Buffer

↓

Kernel

↓

TCP
```

If Node.js becomes busy

processing JSON,

the receive buffer begins filling.

Linux automatically advertises a smaller receive window.

The sender slows down.

Node.js never manually asks the sender to stop.

The kernel handles it.

---

# Real World Example

Imagine your Vulnerability Scanner downloading scan reports.

```
AWS

↓

TCP

↓

Linux Kernel

↓

Receive Buffer

↓

Fastify

↓

Application Logic
```

Even if your application pauses briefly,

TCP prevents AWS from flooding the machine with more data than it can store.

---

# Practical

Run

```bash
ss -ti
```

Observe

```
rcv_space

rcv_ssthresh

rcv_rtt
```

Capture traffic using Wireshark.

Inspect the

```
Window Size

Calculated Window Size

Window Scale
```

fields.

---

# Engineering Insight

Flow Control has nothing to do with Internet speed.

Its only purpose is to protect

the receiving computer.

The receiver decides

how much data it can safely accept.

The sender obeys.

---

# Summary

- Every TCP socket has a Receive Buffer.
- The Receive Window advertises available buffer space.
- Sliding Windows allow continuous transmission.
- Window = 0 pauses transmission.
- Zero Window Probes recover from lost window updates.
- Window Scaling enables modern high-speed networking.
- Flow Control protects receivers—not the network.

---

# Where You'll Use This

## Developer

- Streaming APIs
- File Downloads
- Socket Programming

## DevOps

- Performance Tuning
- Linux Networking
- High-Speed Servers

## Cloud

- EC2
- Kubernetes
- Service Meshes

## Cybersecurity

- Traffic Analysis
- Packet Inspection
- Wireshark

## Interview

- What is rwnd?
- What is Sliding Window?
- What happens when Window = 0?
- Why was Window Scaling introduced?

---

# Common Mistakes

❌ Thinking Sliding Window and Flow Control are different mechanisms.

❌ Believing Flow Control protects the network.

❌ Confusing rwnd with cwnd.

❌ Assuming applications directly control the Receive Window.

---

# Related Topics

- NET-002.3 — Reliability
- NET-002.5 — Congestion Control

---

# Next

➡ **05-Congestion-Control.md**