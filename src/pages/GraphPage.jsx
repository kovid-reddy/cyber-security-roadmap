import React, { useState, useCallback } from 'react'
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

  const handleSelect = useCallback(node => setSelected(node), [])
  const handleClose  = useCallback(() => setSelected(null), [])

  const handleSearchPick = useCallback(id => {
    const node = graphData.nodes.find(n => n.id === id)
    if (node) { setSelected(node.data ?? node); setFocusId(id) }
  }, [graphData])

  const toggleCat  = useCallback(c => setActiveCats(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]), [])
  const toggleStat = useCallback(s => setActiveStats(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]), [])

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column' }}>
      <TopNav
        nodes={graphData.nodes}
        search={search}
        onSearch={setSearch}
        onPick={handleSearchPick}
      />

      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <GraphCanvas
          graphData={graphData}
          search={search}
          activeCats={activeCats}
          activeStats={activeStats}
          onSelect={handleSelect}
          focusId={focusId}
          panelOpen={!!selected}
        />

        <StatsHUD nodes={graphData.nodes} edges={graphData.edges} />

        <FilterBar
          activeCats={activeCats}
          activeStats={activeStats}
          onToggleCat={toggleCat}
          onToggleStat={toggleStat}
        />

        <SidePanel
          node={selected}
          allNodes={graphData.nodes}
          onClose={handleClose}
          onNavigateTo={n => { const node = n.data ?? n; setSelected(node); setFocusId(node.id) }}
        />
      </div>
    </div>
  )
}
