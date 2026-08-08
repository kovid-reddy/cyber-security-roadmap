// Turns Markdown topics and subdirectories into public/graph-data.json as a tree graph.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.resolve('content')
const OUT_FILE = path.resolve('public/graph-data.json')
const GENERATED_ASSETS_DIR = path.resolve('public/topic-assets')

function readMarkdown(file) {
  const raw = fs.readFileSync(file, 'utf8')
  return matter(raw)
}

function normalizeConnections(connections = []) {
  return connections
    .map(connection => {
      if (typeof connection === 'string') return { id: connection, relationship: 'related' }
      if (connection && typeof connection.id === 'string') {
        return { id: connection.id, relationship: connection.relationship || 'related' }
      }
      return null
    })
    .filter(Boolean)
}

function renderMarkdown(content, topicId) {
  const assetPath = `/topic-assets/${encodeURIComponent(topicId)}/`
  return marked.parse(content)
    .replaceAll('src="assets/', `src="${assetPath}`)
    .replaceAll('href="assets/', `href="${assetPath}`)
}

function copyTopicAssets(topicDir, topicId) {
  const source = path.join(topicDir, 'assets')
  if (!fs.existsSync(source)) return
  fs.cpSync(source, path.join(GENERATED_ASSETS_DIR, topicId), { recursive: true })
}

// Clean generated assets first
fs.rmSync(GENERATED_ASSETS_DIR, { recursive: true, force: true })

function buildDirectoryTree(dir, parentId = null) {
  const nodes = []
  
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  // Look for README.md in this directory
  const readmeEntry = entries.find(e => e.isFile() && e.name.toLowerCase() === 'readme.md')
  let currentFolderId = parentId ? `${parentId}/${path.basename(dir)}` : path.basename(dir)
  let folderTitle = path.basename(dir).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  let folderFM = {}
  let folderContentHtml = ''
  
  if (readmeEntry) {
    const readmePath = path.join(dir, readmeEntry.name)
    const { data: fm, content } = readMarkdown(readmePath)
    if (fm.id) currentFolderId = fm.id
    if (fm.title) folderTitle = fm.title
    folderFM = fm
    folderContentHtml = renderMarkdown(content, currentFolderId)
    copyTopicAssets(dir, currentFolderId)
  }
  
  // Create a folder node for the current directory (except the content root itself)
  if (dir !== CONTENT_DIR) {
    const rawCat = folderFM.category || (parentId ? parentId.split('/')[0] : currentFolderId)
    nodes.push({
      id: currentFolderId,
      title: folderTitle,
      type: 'folder',
      parentId: parentId,
      category: rawCat.toLowerCase(), // normalize to lowercase always
      status: folderFM.status || 'not-started',
      difficulty: folderFM.difficulty || 1,
      summary: folderFM.summary || '',
      tags: folderFM.tags || [],
      connections: normalizeConnections(folderFM.connections),
      prerequisites: folderFM.prerequisites || [],
      contentHtml: folderContentHtml,
    })
  } else {
    currentFolderId = null // Root level has null parentId
  }
  
  // Process entries inside this directory
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      // Recurse into subdirectory
      const subResult = buildDirectoryTree(fullPath, currentFolderId)
      nodes.push(...subResult)
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      // Process markdown file as a leaf file node
      const { data: fm, content } = readMarkdown(fullPath)
      const slug = entry.name.replace(/\.md$/, '').toLowerCase()
      const fallbackId = currentFolderId ? `${currentFolderId}::${slug}` : slug
      const fileId = fm.id || fallbackId
      const fileTitle = fm.title || entry.name.replace(/^\d+-/, '').replace(/\.md$/, '').replace(/-/g, ' ')
      
      nodes.push({
        id: fileId,
        title: fileTitle,
        type: 'file',
        parentId: currentFolderId,
        category: fm.category || (currentFolderId ? currentFolderId.split('/')[0] : 'general'),
        status: fm.status || 'not-started',
        difficulty: fm.difficulty || 1,
        summary: fm.summary || '',
        tags: fm.tags || [],
        connections: normalizeConnections(fm.connections),
        prerequisites: fm.prerequisites || [],
        contentHtml: renderMarkdown(content, fileId),
      })
    }
  }
  
  return nodes
}

// Build the nodes tree starting from content/
const nodes = buildDirectoryTree(CONTENT_DIR)

// Build relationships (edges)
const idSet = new Set(nodes.map(node => node.id))
const edges = []
const edgeSet = new Set()

function addEdge(source, target, relationship) {
  if (!idSet.has(source) || !idSet.has(target)) {
    return // Skip connection if target node is missing
  }
  const key = `${source}|||${target}|||${relationship}`
  if (!edgeSet.has(key)) {
    edgeSet.add(key)
    edges.push({ source, target, relationship })
  }
}

for (const node of nodes) {
  for (const connection of node.connections || []) {
    addEdge(node.id, connection.id, connection.relationship)
  }
  for (const prerequisite of node.prerequisites || []) {
    addEdge(prerequisite, node.id, 'prerequisite')
  }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
fs.writeFileSync(OUT_FILE, JSON.stringify({ nodes, edges }, null, 2))
console.log(`Generated tree graph-data.json: ${nodes.length} nodes, ${edges.length} relationships`)
