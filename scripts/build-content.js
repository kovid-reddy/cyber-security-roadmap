// scripts/build-content.js
// Runs before vite build — scans /content/**/*.md and generates
// public/graph-data.json so the React app can load it at runtime.

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.resolve('content')
const OUT_FILE = path.resolve('public/graph-data.json')

function walk(dir) {
  const results = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walk(full))
    else if (entry.name.endsWith('.md')) results.push(full)
  }
  return results
}

const files = walk(CONTENT_DIR)
const nodes = []

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const { data: fm, content } = matter(raw)
  const rel = path.relative(CONTENT_DIR, file)
  const id = rel.replace(/\\/g, '/').replace(/\.md$/, '') // e.g. "networking/dns"

  nodes.push({
    id,
    title: fm.title || path.basename(file, '.md'),
    category: fm.category || rel.split('/')[0],
    status: fm.status || 'not-started',
    difficulty: fm.difficulty || 'beginner',
    summary: fm.summary || '',
    connections: fm.connections || [],
    tags: fm.tags || [],
    contentHtml: marked.parse(content),
  })
}

// Build edge list (deduplicated, bidirectional)
const idSet = new Set(nodes.map(n => n.id))
const edgeSet = new Set()
const edges = []

for (const node of nodes) {
  for (const conn of node.connections) {
    if (!idSet.has(conn)) continue
    const key = [node.id, conn].sort().join('|||')
    if (!edgeSet.has(key)) {
      edgeSet.add(key)
      edges.push({ source: node.id, target: conn })
    }
  }
}

fs.writeFileSync(OUT_FILE, JSON.stringify({ nodes, edges }, null, 2))
console.log(`✓ graph-data.json — ${nodes.length} nodes, ${edges.length} edges`)
