import React, { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import cola from 'cytoscape-cola'
import { catColor, statusOpacity } from '../utils/colors.js'

cytoscape.use(cola)

function hex2rgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `rgba(${r},${g},${b},${a})`
}

export default function GraphCanvas({ graphData, search, activeCats, activeStats, onSelect, focusId, panelOpen }) {
  const containerRef = useRef(null)
  const cyRef        = useRef(null)

  // Init Cytoscape
  useEffect(() => {
    if (!containerRef.current || !graphData) return

    const elements = [
      ...graphData.nodes.map(n => {
        const node = n.data ?? n
        return {
          group: 'nodes',
          data: {
            ...node,
            label: node.title || node.label,
            _color:   catColor(node.category),
            _opacity: statusOpacity(node.status),
            _size:    Math.max(18, Math.min(42, 18 + (node.connections?.length || 0) * 2.2)),
          },
        }
      }),
      ...graphData.edges.map(e => ({
        group: 'edges',
        data: { id: `${e.source}___${e.target}`, source: e.source, target: e.target },
      })),
    ]

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: buildStyle(),
      minZoom: 0.12, maxZoom: 4,
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
    })
    cyRef.current = cy

    const layout = cy.layout({
      name: 'cola',
      animate: true,
      animationDuration: 1400,
      randomize: true,
      fit: true, padding: 80,
      nodeSpacing: 30,
      edgeLength: 130,
      maxSimulationTime: 3500,
    })
    layout.run()

    // Hover highlight
    cy.on('mouseover', 'node', e => {
      containerRef.current.style.cursor = 'pointer'
      const node = e.target
      const hood = node.closedNeighborhood()
      cy.elements().not(hood).addClass('dim')
      hood.addClass('lit')
    })
    cy.on('mouseout', 'node', () => {
      containerRef.current.style.cursor = 'default'
      cy.elements().removeClass('dim lit')
    })

    // Click → select + open side panel
    cy.on('tap', 'node', e => {
      const d = e.target.data()
      const found = graphData.nodes.find(n => n.id === d.id)
      if (found) onSelect(found.data ?? found)
    })

    // Background tap → deselect
    cy.on('tap', e => {
      if (e.target === cy) onSelect(null)
    })

    return () => { cy.destroy(); cyRef.current = null }
  }, [graphData]) // eslint-disable-line

  // Focus on a specific node (from search)
  useEffect(() => {
    if (!cyRef.current || !focusId) return
    const n = cyRef.current.getElementById(focusId)
    if (!n.length) return
    cyRef.current.animate({ center: { eles: n }, zoom: 2 }, { duration: 500, easing: 'ease-in-out-quad' })
  }, [focusId])

  // Filter dimming
  useEffect(() => {
    if (!cyRef.current) return
    const cy = cyRef.current
    const hasFilter = activeCats.length > 0 || activeStats.length > 0

    cy.nodes().forEach(node => {
      const d = node.data()
      const catOk  = activeCats.length === 0 || activeCats.includes(d.category)
      const statOk = activeStats.length === 0 || activeStats.includes(d.status)
      const pass   = !hasFilter || (catOk && statOk)
      node.style('opacity', pass ? statusOpacity(d.status) : 0.04)
    })

    cy.edges().forEach(edge => {
      const s = edge.source().data()
      const t = edge.target().data()
      const hasFilter = activeCats.length > 0 || activeStats.length > 0
      if (!hasFilter) { edge.style('opacity', 0.5); return }
      const sOk = (!activeCats.length || activeCats.includes(s.category)) && (!activeStats.length || activeStats.includes(s.status))
      const tOk = (!activeCats.length || activeCats.includes(t.category)) && (!activeStats.length || activeStats.includes(t.status))
      edge.style('opacity', sOk && tOk ? 0.5 : 0.03)
    })
  }, [activeCats, activeStats])

  // Search highlighting
  useEffect(() => {
    if (!cyRef.current) return
    const cy = cyRef.current
    if (!search.trim()) {
      cy.nodes().forEach(n => n.style('opacity', statusOpacity(n.data('status'))))
      cy.edges().forEach(e => e.style('opacity', 0.5))
      return
    }
    const q = search.toLowerCase()
    cy.nodes().forEach(node => {
      const d  = node.data()
      const ok = d.label?.toLowerCase().includes(q) ||
                 d.category?.includes(q) ||
                 (d.tags||[]).some(t => t.includes(q))
      node.style('opacity', ok ? 1 : 0.04)
    })
    cy.edges().forEach(e => {
      const sOk = e.source().style('opacity') > 0.1
      const tOk = e.target().style('opacity') > 0.1
      e.style('opacity', sOk && tOk ? 0.6 : 0.02)
    })
  }, [search])

  return (
    <div
      ref={containerRef}
      style={{
        position:'absolute', inset:0,
        background:'var(--bg-void)',
        right: panelOpen ? 'var(--panel-w)' : 0,
        transition: 'right 300ms var(--ease)',
      }}
    />
  )
}

function buildStyle() {
  return [
    {
      selector: 'node',
      style: {
        'width': 'data(_size)',
        'height': 'data(_size)',
        'background-color': 'data(_color)',
        'opacity': 'data(_opacity)',
        'border-width': 1.5,
        'border-color': 'data(_color)',
        'border-opacity': 0.5,
        'label': 'data(label)',
        'font-family': '"JetBrains Mono", monospace',
        'font-size': '9px',
        'color': '#8b96b8',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': 6,
        'text-outline-width': 2,
        'text-outline-color': '#04050a',
        'transition-property': 'opacity, border-width, border-color',
        'transition-duration': '180ms',
      },
    },
    {
      selector: 'node[status = "learned"]',
      style: { 'color': '#d8dff5', 'font-size': '10px' },
    },
    {
      selector: 'node.lit',
      style: { 'border-width': 2.5, 'border-opacity': 1, 'color': '#eef0fa', 'opacity': 1 },
    },
    {
      selector: 'node.dim',
      style: { 'opacity': 0.05 },
    },
    {
      selector: 'edge',
      style: {
        'width': 1,
        'line-color': '#1e2640',
        'opacity': 0.5,
        'curve-style': 'bezier',
        'transition-property': 'opacity, width, line-color',
        'transition-duration': '180ms',
      },
    },
    {
      selector: 'edge.lit',
      style: { 'line-color': '#3d4e80', 'width': 1.5, 'opacity': 1 },
    },
    {
      selector: 'edge.dim',
      style: { 'opacity': 0.03 },
    },
  ]
}
