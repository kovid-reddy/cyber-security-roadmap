---
id: NET-002.3
title: Reliability (Sequence Numbers, ACKs & Retransmissions)
category: networking
status: completed
difficulty: 3
summary: Learn how TCP transforms an unreliable packet network into a reliable ordered byte stream using sequence numbers, acknowledgements, retransmissions and buffering.
tags:
  - networking
  - tcp
  - reliability
prerequisites:
  - NET-002.2
connections:
  - id: NET-002.4
    relationship: enables
---

# TCP Reliability

> *TCP doesn't make the network reliable. It makes unreliable networks appear reliable.*

---

# The Problem

Suppose you send

```
HELLO
```

Across the Internet.

The network may

- Lose packets
- Duplicate packets
- Deliver packets out of order
- Delay packets

Applications should never have to worry about these problems.

TCP solves them.

---

# TCP Thinks In Bytes

One of the biggest misconceptions is:

> TCP numbers packets.

It doesn't.

TCP numbers **bytes**.

Example

```
HELLO
```

becomes

```
H → 1000

E → 1001

L → 1002

L → 1003

O → 1004
```

Packets merely transport groups of bytes.

The byte stream is what TCP actually tracks.

---

# Why Number Bytes?

Imagine

Packet 1

```
1000

1001

1002
```

Packet 2

```
1003

1004
```

If Packet 2 is lost,

TCP knows

exactly

which bytes

are missing.

Not simply

"Packet 2."

---

# Sequence Numbers

Every transmitted byte belongs to a sequence.

Example

```
Sequence

1000

↓

1001

↓

1002

↓

1003

↓

1004
```

Sequence numbers allow TCP to

- Detect missing data
- Detect duplicates
- Restore ordering

---

# ACKs

ACK does **not** mean

> "I received one packet."

It means

> "I have successfully received every byte up to this point."

Example

Server replies

```
ACK = 1005
```

Meaning

```
Received

1000

1001

1002

1003

1004

↓

Send

1005
```

ACK always indicates

the **next expected byte**.

---

# Cumulative Acknowledgements

Suppose

the receiver gets

```
1000

1001

1002

1003

1004
```

Instead of sending

```
ACK1001

ACK1002

ACK1003

ACK1004

ACK1005
```

TCP simply sends

```
ACK1005
```

One acknowledgement confirms

every previous byte.

This is called

**Cumulative Acknowledgement**.

---

# Packet Loss

Imagine

```
1000

1001

1002

1003

1004
```

Byte

```
1002
```

is lost.

Receiver has

```
1000

1001

Missing

1003

1004
```

Should it acknowledge

1004?

No.

TCP guarantees

ordered delivery.

The receiver repeatedly replies

```
ACK = 1002
```

Meaning

"I'm still waiting for byte 1002."

---

# Retransmission

Eventually

the sender notices

```
ACK1002

ACK1002

ACK1002
```

or

a retransmission timer expires.

The sender retransmits

the missing data.

The application

never notices.

---

# Duplicate Packets

Suppose

byte

```
1002
```

arrives twice.

TCP checks

the sequence number.

Already received?

Discard it.

The application only receives one copy.

---

# Out Of Order Delivery

Suppose

the receiver gets

```
1003

1004
```

before

```
1002
```

TCP stores

1003

and

1004

inside

the receive buffer.

Only after

1002

arrives

does TCP deliver

```
1002

1003

1004
```

to the application.

Applications always receive

ordered data.

---

# Send Buffer

When an application calls

```javascript
socket.write("HELLO");
```

the data is copied into

the **TCP Send Buffer**.

```
Application

↓

Send Buffer

↓

TCP

↓

Network
```

The application returns immediately.

TCP continues

sending,

tracking,

and retransmitting

in the background.

---

# Receive Buffer

Incoming data first enters

the **Receive Buffer**.

```
Network

↓

TCP

↓

Receive Buffer

↓

Application
```

Only after

missing bytes arrive

does TCP deliver

the complete ordered stream.

---

# How TCP Achieves Reliability

```
Sequence Numbers

↓

ACKs

↓

Cumulative ACKs

↓

Retransmissions

↓

Duplicate Detection

↓

Reordering

↓

Buffering
```

No single feature makes TCP reliable.

The combination does.

---

# Real World Example

Imagine your Vulnerability Scanner downloads a large report from AWS.

```
Node.js

↓

socket.write()

↓

Kernel

↓

TCP

↓

Internet

↓

AWS
```

If packets are lost,

Node.js doesn't retry.

The Linux kernel handles retransmissions automatically.

---

# Practical

Capture a download using Wireshark.

Look for

```
TCP Retransmission

Duplicate ACK

Sequence Number

Acknowledgement Number
```

Every concept discussed in this chapter becomes visible.

---

# Engineering Insight

Applications believe they are sending

```
HELLO
```

TCP believes it is transmitting

```
1000

↓

1004
```

TCP has no understanding of text,

JSON,

images,

or HTTP.

It only manages bytes.

---

# Summary

- TCP numbers bytes, not packets.
- ACKs acknowledge byte ranges.
- TCP detects loss using ACKs and timers.
- Duplicate packets are discarded.
- Out-of-order bytes are buffered.
- Applications always receive ordered data.

---

# Where You'll Use This

## Developer

- Socket Programming
- Streaming APIs
- File Transfers

## DevOps

- Performance Debugging
- Packet Loss Analysis

## Cybersecurity

- Wireshark
- Network Forensics
- Packet Analysis

## Interview

- Why does TCP number bytes?
- What does ACK=1005 mean?
- What is cumulative acknowledgement?
- How does TCP recover from packet loss?

---

# Common Mistakes

❌ Thinking ACK confirms a packet.

❌ Thinking TCP numbers packets.

❌ Assuming applications handle retransmissions.

❌ Believing out-of-order packets are immediately delivered.

---

# Related Topics

- NET-002.2 — Connection Establishment
- NET-002.4 — Flow Control

---

# Next

➡ **04-Flow-Control.md**