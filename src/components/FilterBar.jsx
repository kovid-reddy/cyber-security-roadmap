import React, { useState } from 'react'
import { CAT_COLORS, CAT_LABELS } from '../utils/colors.js'

const STATUSES = [
  { id: 'learned',     label: 'Learned',     color: '#00ffb3' },
  { id: 'in-progress', label: 'In Progress', color: '#ffe033' },
  { id: 'not-started', label: 'Not Started', color: '#444d6a' },
]

export default function FilterBar({ activeCats, activeStats, onToggleCat, onToggleStat }) {
  const [open, setOpen] = useState(false)
  const hasActive = activeCats.length > 0 || activeStats.length > 0

  function clearAll() {
    activeCats.forEach(c => onToggleCat(c))
    activeStats.forEach(s => onToggleStat(s))
  }

  return (
    <div style={{ position:'absolute', bottom:18, left:16, zIndex:40, display:'flex', flexDirection:'column', alignItems:'flex-start', gap:6 }}>
      {open && (
        <div style={{
          background:'rgba(255,255,255,0.95)', border:'1px solid var(--border-1)',
          borderRadius:8, padding:'14px', backdropFilter:'blur(16px)',
          animation:'fadeUp 150ms var(--ease)', display:'flex', flexDirection:'column', gap:16, minWidth:190,
        }}>
          <div>
            <FilterLabel>Category</FilterLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {Object.entries(CAT_LABELS).map(([id, label]) => (
                <FilterBtn key={id} active={activeCats.includes(id)} color={CAT_COLORS[id]} label={label} onClick={() => onToggleCat(id)} />
              ))}
            </div>
          </div>
          <div>
            <FilterLabel>Status</FilterLabel>
            <div style={{ display:'flex', flexDirection:'column', gap:3 }}>
              {STATUSES.map(s => (
                <FilterBtn key={s.id} active={activeStats.includes(s.id)} color={s.color} label={s.label} onClick={() => onToggleStat(s.id)} />
              ))}
            </div>
          </div>
          {hasActive && (
            <button onClick={clearAll} style={{ padding:'5px 8px', fontSize:10, color:'var(--text-lo)', border:'1px solid var(--border-1)', borderRadius:4, letterSpacing:'0.06em', fontFamily:'var(--font-code)', transition:'color 150ms' }}
              onMouseEnter={e => e.currentTarget.style.color='var(--text-hi)'}
              onMouseLeave={e => e.currentTarget.style.color='var(--text-lo)'}
            >Clear All</button>
          )}
        </div>
      )}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display:'flex', alignItems:'center', gap:7, padding:'7px 12px',
          background:'rgba(255,255,255,0.92)', border:`1px solid ${hasActive ? 'var(--border-2)' : 'var(--border-1)'}`,
          borderRadius:6, color: hasActive ? 'var(--text-hi)' : 'var(--text-mid)',
          fontSize:11, backdropFilter:'blur(12px)', fontFamily:'var(--font-code)', letterSpacing:'0.04em', transition:'border-color 150ms',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor='var(--border-3)'}
        onMouseLeave={e => e.currentTarget.style.borderColor= hasActive ? 'var(--border-2)' : 'var(--border-1)'}
      >
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M0 1h12M2 5h8M4 9h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        Filter
        {hasActive && (
          <span style={{ background:'var(--accent)', color:'var(--bg-void)', fontSize:9, fontWeight:800, borderRadius:'50%', width:16, height:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {activeCats.length + activeStats.length}
          </span>
        )}
      </button>
    </div>
  )
}

function FilterLabel({ children }) {
  return <div style={{ fontSize:9, color:'var(--text-lo)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:7, fontFamily:'var(--font-code)', fontWeight:700 }}>{children}</div>
}

function FilterBtn({ active, color, label, onClick }) {
  return (
    <button onClick={onClick}
      style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 8px', borderRadius:4, textAlign:'left', background: active ? `${color}15` : 'transparent', border:`1px solid ${active ? color + '40' : 'transparent'}`, opacity: active ? 1 : 0.55, transition:'all 150ms var(--ease)', width:'100%' }}
      onMouseEnter={e => e.currentTarget.style.opacity='1'}
      onMouseLeave={e => e.currentTarget.style.opacity= active ? '1' : '0.55'}
    >
      <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background: active ? color : 'transparent', border:`1.5px solid ${color}`, transition:'background 150ms' }} />
      <span style={{ fontSize:11, fontFamily:'var(--font-code)', color: active ? color : 'var(--text-mid)', fontWeight: active ? 600 : 400 }}>{label}</span>
    </button>
  )
}
