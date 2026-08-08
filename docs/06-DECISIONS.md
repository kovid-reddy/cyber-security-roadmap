# Decisions

Major architectural decisions are recorded here.

---

## Format

Date

Decision

Reason

Alternatives Considered

Status

---

## 2026-07-14

**Decision:** A topic folder whose `README.md` contains a permanent `id` creates one graph node. Its numbered Markdown files are chapters of that topic, and its `assets/` directory stores topic-specific visual material.

**Reason:** This keeps each concept grouped, scalable, and readable while avoiding one graph node per chapter.

**Status:** Accepted
