import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import GraphPage from './pages/GraphPage.jsx'
import NotePage from './pages/NotePage.jsx'

export default function App() {
  const [graphData, setGraphData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'graph-data.json')
      .then(r => {
        if (!r.ok) throw new Error(`graph-data.json not found (HTTP ${r.status}). Run: npm run dev`)
        return r.json()
      })
      .then(setGraphData)
      .catch(e => setError(e.message))
  }, [])

  if (error) return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--bg-void)', gap:14, padding:32, textAlign:'center' }}>
      <span style={{ fontSize:32, opacity:0.3 }}>⚠</span>
      <p style={{ color:'#ff4060', fontFamily:'var(--font-code)', fontSize:13, maxWidth:440 }}>{error}</p>
      <p style={{ color:'var(--text-lo)', fontFamily:'var(--font-code)', fontSize:11 }}>
        Make sure you used <code style={{ color:'var(--accent)', background:'var(--bg-card)', padding:'2px 6px', borderRadius:3 }}>npm run dev</code> — this generates graph-data.json first
      </p>
    </div>
  )

  if (!graphData) return <Loading />

  return (
    <Routes>
      <Route path="/" element={<GraphPage graphData={graphData} />} />
      <Route path="/topic/*" element={<NotePage graphData={graphData} />} />
    </Routes>
  )
}

function Loading() {
  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-void)', flexDirection:'column', gap:16 }}>
      <div style={{ width:36, height:36, border:'2px solid var(--border-1)', borderTop:'2px solid var(--accent)', borderRadius:'50%', animation:'spin 700ms linear infinite' }} />
      <span style={{ fontSize:10, color:'var(--text-lo)', letterSpacing:'0.15em', fontFamily:'var(--font-code)' }}>LOADING ATLAS</span>
    </div>
  )
}
