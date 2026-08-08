# Cyber Atlas Architecture

Version: 2.0
Status: Accepted

---

# Purpose

This document defines the architecture of Cyber Atlas.

Cyber Atlas is designed as a graph-first knowledge management system where Markdown files act as the single source of truth.

The application should never contain hardcoded learning data.

Instead:

Markdown
↓

Frontmatter

↓

Parser

↓

Graph

↓

Website

---

# High-Level Architecture

```
Markdown Notes
        │
        ▼
Markdown Parser
        │
        ▼
Graph Generator
        │
        ▼
Search Index
        │
        ▼
React UI
        │
        ▼
User
```

---

# Repository Structure

```
cyber-atlas/

├── docs/
├── content/
├── src/
├── public/
├── assets/
├── scripts/
└── package.json
```

---

# Responsibilities

## docs/

Contains project specifications.

Never rendered.

Read by developers and AI assistants.

---

## content/

Contains every learning topic.

Each Markdown file represents exactly one concept.

---

## src/

Contains website implementation.

No learning content should exist here.

Only rendering logic.

---

## assets/

Images

Packet captures

Diagrams

Draw.io files

Icons

GIFs

---

## scripts/

Automation scripts.

Examples

- Graph generation
- Search indexing
- Validation
- Dead link detection

---

# Rendering Pipeline

Markdown

↓

Gray Matter

↓

Frontmatter Object

↓

Markdown Content

↓

Graph Builder

↓

React Components

---

# Source of Truth

Only Markdown files.

Never duplicate information.

If content changes,

Graph updates automatically.

## Topic folders

A directory with a `README.md` containing a permanent `id` is one topic. The `README.md` contains the topic's graph frontmatter and overview. Numbered Markdown files in the same directory are chapters displayed on that topic page. An `assets/` directory holds diagrams and images for the topic. A module-level `README.md` without an `id` is documentation only.

Use relative Markdown paths such as `![DNS tree](assets/dns-tree.png)`. The build copies topic assets into the generated site automatically.

---

# Graph Philosophy

Nodes represent concepts.

Edges represent relationships.

The graph is generated automatically.

No manual graph editing.

---

# Future Features

- Typed edges
- Prerequisite tree
- Search ranking
- Learning statistics
- Progress tracking
- Flashcards
- Quiz generation
- Labs
- Timeline visualization
- Difficulty heatmap

---

# Non Goals

Cyber Atlas is NOT

- LMS
- Blog
- CMS
- Note editor

Editing happens in Markdown.

Website is read-only.
