import React from 'react'

function getStatus(node) {
  return node?.data?.status ?? node?.status
}

export default function StatsHUD({ nodes = [], edges = [] }) {
  const total    = nodes.length
  const learned  = nodes.filter(n => getStatus(n) === 'learned').length
  const progress = nodes.filter(n => getStatus(n) === 'in-progress').length
  const pct      = total > 0 ? Math.round((learned / total) * 100) : 0

  return (
    <div style={{
      position:'absolute', top:14, left:16, zIndex:40,
      display:'flex', alignItems:'stretch',
      background:'rgba(7,8,15,0.9)', border:'1px solid var(--border-1)',
      borderRadius:7, backdropFilter:'blur(14px)', overflow:'hidden',
    }}>
      <StatCell label="Nodes"  value={total} />
      <Divider />
      <StatCell label="Edges"  value={edges.length} />
      <Divider />
      <StatCell label="Learned" value={learned} color="var(--s-learned)" />
      {progress > 0 && (<><Divider /><StatCell label="In Progress" value={progress} color="var(--s-progress)" /></>)}
      <Divider />
      <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', justifyContent:'center', gap:4, minWidth:80 }}>
        <span style={{ fontSize:9, color:'var(--text-lo)', letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-code)' }}>Progress</span>
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{ flex:1, height:3, background:'var(--border-1)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ width:`${pct}%`, height:'100%', borderRadius:2, background:'linear-gradient(90deg, var(--s-learned), var(--accent))', transition:'width 800ms var(--ease)' }} />
          </div>
          <span style={{ fontSize:10, color:'var(--s-learned)', fontFamily:'var(--font-code)', fontWeight:700, minWidth:28 }}>{pct}%</span>
        </div>
      </div>
    </div>
  )
}

function StatCell({ label, value, color }) {
  return (
    <div style={{ padding:'0 14px', display:'flex', flexDirection:'column', justifyContent:'center', gap:1 }}>
      <span style={{ fontSize:9, color:'var(--text-lo)', letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-code)' }}>{label}</span>
      <span style={{ fontSize:16, fontWeight:700, color: color || 'var(--text-mid)', fontFamily:'var(--font-ui)' }}>{value}</span>
    </div>
  )
}

function Divider() {
  return <div style={{ width:1, background:'var(--border-0)', alignSelf:'stretch', margin:'8px 0' }} />
}
