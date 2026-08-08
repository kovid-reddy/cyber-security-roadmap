import React, { useState, useCallback, useMemo } from 'react'
import GraphCanvas from '../components/GraphCanvas.jsx'
import SidePanel from '../components/SidePanel.jsx'
import TopNav from '../components/TopNav.jsx'
import FilterBar from '../components/FilterBar.jsx'
import StatsHUD from '../components/StatsHUD.jsx'

export default function GraphPage({ graphData }) {
  const [selected, setSelected]   = useState(null)
  const [search, setSearch]       = useState('')
  const [activeCats, setActiveCats] = useState([])
  const [activeStats, setActiveStats] = useState([])
  const [focusId, setFocusId]     = useState(null)
  const [currentPath, setCurrentPath] = useState(null)

  const displayedGraph = useMemo(() => {
    // 1. Filter nodes at the current level
    const nodes = graphData.nodes.filter(node => {
      // If currentPath is null, show top-level categories/folders
      if (currentPath === null) {
        return node.parentId === null
      }
      return node.parentId === currentPath
    })

    // 2. Filter edges connecting nodes present at this level
    const nodeIds = new Set(nodes.map(node => node.id))
    const edges = graphData.edges.filter(edge => {
      return nodeIds.has(edge.source) && nodeIds.has(edge.target)
    })

    // 3. Find parent folder details
    const parentTopic = currentPath 
      ? graphData.nodes.find(node => node.id === currentPath)
      : null

    return { nodes, edges, parentTopic }
  }, [graphData, currentPath])

  const handleSelect = useCallback(node => {
    if (!node) {
      setSelected(null)
      return
    }
    // If the clicked node is a folder, drill down into it
    if (node.type === 'folder') {
      setCurrentPath(node.id)
      setSelected(null)
      setFocusId(null)
      return
    }
    // If it's a file, select it to view the side panel
    setSelected(node)
  }, [])
  
  const handleClose  = useCallback(() => setSelected(null), [])

  const handleSearchPick = useCallback(id => {
    const node = graphData.nodes.find(n => n.id === id)
    if (node) { 
      setCurrentPath(node.parentId) // Navigate the graph to show the node's parent directory
      setSelected(node.data ?? node)
      setFocusId(id) 
    }
  }, [graphData])

  const toggleCat  = useCallback(c => setActiveCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]), [])
  const toggleStat = useCallback(s => setActiveStats(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]), [])

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column' }}>
      <TopNav
        nodes={graphData.nodes} // Allow searching all nodes, not just current folder level
        search={search}
        onSearch={setSearch}
        onPick={handleSearchPick}
      />

      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <GraphCanvas
          graphData={displayedGraph}
          search={search}
          activeCats={activeCats}
          activeStats={activeStats}
          onSelect={handleSelect}
          focusId={focusId}
          panelOpen={!!selected}
        />

        <StatsHUD nodes={displayedGraph.nodes} edges={displayedGraph.edges} />

        {displayedGraph.parentTopic && (
          <button
            onClick={() => { 
              const parent = displayedGraph.parentTopic
              setCurrentPath(parent.parentId) // Go up one level
              setSelected(null)
              setFocusId(null) 
            }}
            style={{ position:'absolute', top:14, left:385, zIndex:40, padding:'9px 12px', border:'1px solid var(--border-2)', borderRadius:6, background:'rgba(255,255,255,0.92)', color:'var(--accent)', fontSize:11, fontFamily:'var(--font-code)' }}
          >
            ← Back to {displayedGraph.parentTopic.parentId ? 'Parent' : 'Atlas'}
          </button>
        )}

        <FilterBar
          activeCats={activeCats}
          activeStats={activeStats}
          onToggleCat={toggleCat}
          onToggleStat={toggleStat}
        />

        <SidePanel
          node={selected}
          allNodes={graphData.nodes} // Allow linking to any related topic in the graph
          onClose={handleClose}
          onNavigateTo={n => { 
            const node = n.data ?? n
            setCurrentPath(node.parentId) // Navigate the graph to show the target node's folder
            setSelected(node)
            setFocusId(node.id) 
          }}
        />
      </div>
    </div>
  )
}
