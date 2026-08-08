import React, { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import { catColor, statusOpacity } from '../utils/colors.js'

export default function GraphCanvas({ graphData, search, activeCats, activeStats, onSelect, focusId, panelOpen }) {
  const containerRef = useRef(null)
  const cyRef        = useRef(null)

  // Helper to normalize category names for matching and IDs
  function normalizeCat(cat) {
    if (!cat) return ''
    return cat.toLowerCase().replace(/[\s\-_]/g, '')
  }

  // Init Cytoscape
  useEffect(() => {
    if (!containerRef.current || !graphData) return

    // Extract unique categories (normalize to lowercase)
    const categories = Array.from(new Set(
      graphData.nodes
        .map(n => (n.data ?? n).category?.toLowerCase())
        .filter(Boolean)
    ))

    // Build parent elements
    const parentNodes = categories.map(cat => {
      const label = cat.split(/[-_\s]/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      return {
        group: 'nodes',
        data: {
          id: `cat-${normalizeCat(cat)}`,
          label: label,
          isParent: true,
          category: cat,
          _color: catColor(cat),
          _opacity: 1,
          _width: 1,
          _height: 1,
        }
      }
    })

    // Build child elements with bigger, readable sizes
    const childNodes = graphData.nodes.map(n => {
      const node = n.data ?? n
      const isFolder = node.type === 'folder'
      const rawLabel = node.title || node.label || ''
      const label = isFolder ? `📁 ${rawLabel}` : rawLabel
      const charCount = rawLabel.length
      // Make nodes significantly larger and more readable
      const estWidth  = Math.max(160, Math.min(260, charCount * 8.5 + 40))
      const estHeight = charCount > 20 ? 56 : 46

      return {
        group: 'nodes',
        data: {
          ...node,
          label: label,
          parent: node.category ? `cat-${normalizeCat(node.category)}` : undefined,
          isParent: false,
          _color:   catColor(node.category),
          _opacity: statusOpacity(node.status),
          _width:   estWidth,
          _height:  estHeight,
        },
      }
    })

    const elements = [
      ...parentNodes,
      ...childNodes,
      ...graphData.edges.map(e => ({
        group: 'edges',
        data: { 
          id: `${e.source}___${e.target}___${e.relationship || 'related'}`, 
          source: e.source, 
          target: e.target, 
          relationship: e.relationship || 'related' 
        },
      })),
    ]

    // Determine layout type based on node count
    const nodeCount = graphData.nodes.length

    // Use grid layout for small counts (root / level 2), cose for deep trees
    const layoutConfig = nodeCount <= 12
      ? {
          name: 'grid',
          fit: true,
          padding: 90,
          avoidOverlapPadding: 40,
          condense: false,
          rows: Math.ceil(Math.sqrt(nodeCount)),
          cols: Math.ceil(nodeCount / Math.ceil(Math.sqrt(nodeCount))),
          animate: false,
        }
      : {
          name: 'cose',
          animate: false,
          refresh: 20,
          fit: true,
          padding: 80,
          randomize: false,
          nodeRepulsion: () => 12000000,
          nodeOverlap: 80,
          idealEdgeLength: () => 200,
          edgeElasticity: () => 60,
          nestingFactor: 2.5,
          gravity: 0.4,
          numIter: 2000,
          initialTemp: 3000,
          coolingFactor: 0.995,
          minTemp: 1.0
        }

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: buildStyle(),
      minZoom: 0.08, maxZoom: 3,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
      layout: layoutConfig,
    })
    cyRef.current = cy

    // Hover highlight
    cy.on('mouseover', 'node', e => {
      const node = e.target
      if (node.data('isParent')) return
      containerRef.current.style.cursor = 'pointer'
      const hood = node.closedNeighborhood()
      cy.elements().not(hood).not(':parent').addClass('dim')
      hood.addClass('lit')
    })
    cy.on('mouseout', 'node', e => {
      const node = e.target
      if (node.data('isParent')) return
      containerRef.current.style.cursor = 'default'
      cy.elements().removeClass('dim lit')
    })

    // Click → select + open side panel (only for child nodes)
    cy.on('tap', 'node', e => {
      const node = e.target
      if (node.data('isParent')) return
      const d = node.data()
      const found = graphData.nodes.find(n => n.id === d.id)
      if (found) onSelect(found.data ?? found)
    })

    // Background tap → deselect
    cy.on('tap', e => {
      if (e.target === cy) onSelect(null)
    })

    return () => {
      if (cyRef.current) {
        cyRef.current.stop()
        cyRef.current.destroy()
        cyRef.current = null
      }
    }
  }, [graphData]) // eslint-disable-line

  // Focus on a specific node (from search)
  useEffect(() => {
    if (!cyRef.current || !focusId) return
    const n = cyRef.current.getElementById(focusId)
    if (!n.length) return
    cyRef.current.animate({ center: { eles: n }, zoom: 1.3 }, { duration: 500, easing: 'ease-in-out-quad' })
  }, [focusId])

  // Filter dimming
  useEffect(() => {
    if (!cyRef.current) return
    const cy = cyRef.current
    const hasFilter = activeCats.length > 0 || activeStats.length > 0

    cy.nodes().forEach(node => {
      if (node.data('isParent')) {
        node.style('opacity', 1)
        return
      }
      const d = node.data()
      const catOk  = activeCats.length === 0 || activeCats.includes(d.category)
      const statOk = activeStats.length === 0 || activeStats.includes(d.status)
      const pass   = !hasFilter || (catOk && statOk)
      node.style('opacity', pass ? statusOpacity(d.status) : 0.05)
    })

    cy.edges().forEach(edge => {
      const s = edge.source().data()
      const t = edge.target().data()
      const hasFilter = activeCats.length > 0 || activeStats.length > 0
      if (!hasFilter) { edge.style('opacity', 0.6); return }
      const sOk = (!activeCats.length || activeCats.includes(s.category)) && (!activeStats.length || activeStats.includes(s.status))
      const tOk = (!activeCats.length || activeCats.includes(t.category)) && (!activeStats.length || activeStats.includes(t.status))
      edge.style('opacity', sOk && tOk ? 0.6 : 0.03)
    })
  }, [activeCats, activeStats])

  // Search highlighting
  useEffect(() => {
    if (!cyRef.current) return
    const cy = cyRef.current
    if (!search.trim()) {
      cy.nodes().forEach(node => {
        if (node.data('isParent')) {
          node.style('opacity', 1)
        } else {
          node.style('opacity', statusOpacity(node.data('status')))
        }
      })
      cy.edges().forEach(e => e.style('opacity', 0.6))
      return
    }
    const q = search.toLowerCase()
    cy.nodes().forEach(node => {
      if (node.data('isParent')) {
        node.style('opacity', 0.9)
        return
      }
      const d  = node.data()
      const ok = d.label?.toLowerCase().includes(q) ||
                 d.category?.includes(q) ||
                 (d.tags||[]).some(t => t.includes(q))
      node.style('opacity', ok ? 1 : 0.05)
    })
    cy.edges().forEach(e => {
      const sOk = e.source().style('opacity') > 0.1
      const tOk = e.target().style('opacity') > 0.1
      e.style('opacity', sOk && tOk ? 0.7 : 0.02)
    })
  }, [search])

  return (
    <div
      ref={containerRef}
      style={{
        position:'absolute', inset:0,
        right: panelOpen ? 'var(--panel-w)' : 0,
        transition: 'right 300ms var(--ease)',
      }}
    />
  )
}

function buildStyle() {
  return [
    {
      selector: 'node:not(:parent)',
      style: {
        'shape': 'round-rectangle',
        'width': 'data(_width)',
        'height': 'data(_height)',
        'background-color': '#fffdeb',
        'border-width': 2,
        'border-color': 'data(_color)',
        'border-style': 'solid',
        'label': 'data(label)',
        'font-family': '"Outfit", "Inter", sans-serif',
        'font-size': '13px',
        'font-weight': '600',
        'color': '#1e293b',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-wrap': 'wrap',
        'text-max-width': '220px',
        'corner-radius': '8px',
        'opacity': 'data(_opacity)',
        'padding': '8px 14px',
        'transition-property': 'opacity, border-width, border-color, background-color',
        'transition-duration': '200ms',
      },
    },
    {
      selector: 'node:not(:parent)[type = "folder"]',
      style: {
        'background-color': '#fefce8',
        'border-style': 'double',
        'border-width': 4,
        'font-size': '14px',
        'font-weight': '700',
      }
    },
    {
      selector: 'node:parent',
      style: {
        'background-color': 'data(_color)',
        'background-opacity': 0.04,
        'border-color': 'data(_color)',
        'border-width': 1.5,
        'border-style': 'dashed',
        'label': 'data(label)',
        'font-family': '"Outfit", sans-serif',
        'font-size': '15px',
        'font-weight': '800',
        'color': '#0f172a',
        'text-valign': 'top',
        'text-halign': 'center',
        'text-margin-y': -12,
        'padding': '30px 24px 24px 24px',
        'corner-radius': '12px',
      }
    },
    {
      selector: 'node:not(:parent)[status = "learned"], node:not(:parent)[status = "completed"]',
      style: {
        'background-color': '#f0fdf4',
        'border-color': '#10b981',
        'color': '#064e3b',
      },
    },
    {
      selector: 'node:not(:parent)[status = "in-progress"]',
      style: {
        'background-color': '#fffbeb',
        'border-color': '#f59e0b',
        'color': '#78350f',
        'border-style': 'double',
      },
    },
    {
      selector: 'node.lit',
      style: {
        'border-width': 3.5,
        'border-color': '#2563eb',
        'color': '#1e3a8a',
        'opacity': 1,
      },
    },
    {
      selector: 'node.dim',
      style: {
        'opacity': 0.1,
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#94a3b8',
        'target-arrow-color': '#94a3b8',
        'target-arrow-shape': 'triangle',
        'arrow-scale': 1.2,
        'opacity': 0.65,
        'curve-style': 'bezier',
        'transition-property': 'opacity, width, line-color',
        'transition-duration': '200ms',
      },
    },
    {
      selector: 'edge.lit',
      style: {
        'line-color': '#2563eb',
        'width': 2.5,
        'opacity': 1,
      },
    },
    {
      selector: 'edge.dim',
      style: {
        'opacity': 0.04,
      },
    },
  ]
}
