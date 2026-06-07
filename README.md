# 🔐 Cyber Atlas

> An interactive cybersecurity knowledge graph — concepts as nodes, relationships as edges.  
> Hosted on GitHub Pages. Grows as I learn.

**[→ Live Site](https://YOUR_USERNAME.github.io/cyber-security/)**

---

## What is this?

An Obsidian-style knowledge graph of every cybersecurity concept I'm learning. Not a blog, not a course — a network you can explore.

- **Click a node** → side panel with summary
- **Click "View Full Note"** → full markdown page
- **Filter by category or status** → bottom-left
- **Search** → top bar

Node brightness reflects learning status:
| | |
|---|---|
| 🟢 Full glow | Learned |
| 🟡 Dimmed | In Progress |
| ⚫ Ghost | Not Started |

---

## Deploy your own fork

```bash
git clone https://github.com/YOUR_USERNAME/cyber-security
cd cyber-security
npm install
npm run dev          # local dev at localhost:5173
```

**GitHub Pages setup:**
1. Go to repo **Settings → Pages**
2. Set source: **GitHub Actions**
3. Push to `main` → auto-deploys

If your repo has a different name, edit `vite.config.js`:
```js
base: '/YOUR-REPO-NAME/',
```

---

## Adding content

### Mark a topic as learned

Open `content/networking/dns.md`, change the frontmatter:

```yaml
status: learned   # was: not-started
```

Push → site rebuilds automatically.

### Add a new topic

Create `content/CATEGORY/topic-name.md`:

```markdown
---
title: My Topic
category: security          # networking | security | operating-systems | cloud | programming | certifications | ctfs
status: not-started         # not-started | in-progress | learned
difficulty: beginner        # beginner | intermediate | advanced
summary: One sentence description shown in the side panel.
connections:
  - security/kerberos       # IDs of related topics (category/filename)
  - networking/dns
tags:
  - security
  - identity
---

## What is it?

Your full notes go here. Markdown, tables, code blocks — everything renders.
```

Push → graph auto-updates with new node and edges.

### Content categories

```
content/
  networking/       # DNS, DHCP, OSI, subnetting, VLANs...
  security/         # Kerberos, AD, cryptography, attacks...
  operating-systems/ # Linux, Windows, permissions...
  cloud/            # AWS, IaC, cloud-basics...
  programming/      # Python, Bash, PowerShell...
  certifications/   # Security+, OSCP, CEH...
  ctfs/             # HackTheBox, TryHackMe...
```

---

## Tech

- **React + Vite** — framework
- **Cytoscape.js + cola** — graph engine
- **gray-matter** — frontmatter parsing
- **marked** — markdown rendering  
- **GitHub Actions** — CI/CD
- **GitHub Pages** — hosting

---

*Roadmap from [roadmap.sh/cyber-security](https://roadmap.sh/cyber-security)*
