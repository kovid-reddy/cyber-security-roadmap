import React, { useState, useRef, useEffect } from 'react'
import { catColor } from '../utils/colors.js'

export default function TopNav({ nodes, search, onSearch, onPick }) {
  const [results, setResults] = useState([])
  const [open, setOpen]       = useState(false)
  const dropRef               = useRef(null)

  useEffect(() => {
    if (!search.trim()) { setResults([]); setOpen(false); return }
    const q = search.toLowerCase()
    const hits = nodes
      .map(n => n.data ?? n)
      .filter(d =>
        d.title?.toLowerCase().includes(q) ||
        d.category?.includes(q) ||
        (d.tags||[]).some(t => t.includes(q))
      )
      .slice(0, 9)
    setResults(hits)
    setOpen(hits.length > 0)
  }, [search, nodes])

  useEffect(() => {
    function out(e) { if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', out)
    return () => document.removeEventListener('mousedown', out)
  }, [])

  return (
    <header style={{
      height:'var(--nav-h)', flexShrink:0,
      background:'rgba(255,255,255,0.96)',
      borderBottom:'1px solid var(--border-1)',
      display:'flex', alignItems:'center',
      padding:'0 20px', gap:20,
      backdropFilter:'blur(12px)',
      position:'relative', zIndex:100,
    }}>
      {/* Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <polygon points="11,1 21,6 21,16 11,21 1,16 1,6"
            fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeLinejoin="round"/>
          <circle cx="11" cy="11" r="3" fill="#ff4060"/>
          <line x1="11" y1="8" x2="11" y2="1" stroke="#00e5ff" strokeWidth="1"/>
          <line x1="11" y1="14" x2="11" y2="21" stroke="#00e5ff" strokeWidth="1"/>
          <line x1="8.4" y1="9.5" x2="1" y2="6" stroke="#00e5ff" strokeWidth="1"/>
          <line x1="13.6" y1="12.5" x2="21" y2="16" stroke="#00e5ff" strokeWidth="1"/>
        </svg>
        <span style={{ fontFamily:'var(--font-ui)', fontWeight:800, fontSize:15, letterSpacing:'0.06em', color:'var(--text-hi)' }}>
          CYBER<span style={{ color:'var(--accent)' }}>ATLAS</span>
        </span>
      </div>

      <div style={{ width:1, height:22, background:'var(--border-1)', flexShrink:0 }} />

      {/* Search */}
      <div ref={dropRef} style={{ flex:1, maxWidth:460, position:'relative' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          background:'var(--bg-card)', border:'1px solid var(--border-1)',
          borderRadius:'var(--radius)', padding:'0 12px',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ color:'var(--text-lo)', flexShrink:0 }}>
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search topics, categories, tags..."
            style={{
              background:'none', border:'none', outline:'none',
              color:'var(--text-hi)', fontSize:12, flex:1,
              padding:'8px 0', letterSpacing:'0.02em',
              fontFamily:'var(--font-code)',
            }}
          />
          {search && (
            <button onClick={() => { onSearch(''); setOpen(false) }}
              style={{ color:'var(--text-lo)', fontSize:15, lineHeight:1 }}>×</button>
          )}
        </div>

        {open && (
          <div style={{
            position:'absolute', top:'calc(100% + 4px)', left:0, right:0,
            background:'var(--bg-panel)', border:'1px solid var(--border-2)',
            borderRadius:'var(--radius)', overflow:'hidden', zIndex:200,
            animation:'fadeUp 150ms var(--ease)',
          }}>
            {results.map(d => (
              <button
                key={d.id}
                onClick={() => { onPick(d.id); setOpen(false); onSearch('') }}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  width:'100%', padding:'9px 14px', textAlign:'left',
                  borderBottom:'1px solid var(--border-0)',
                  transition:'background 120ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background='var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >
                <div style={{ width:7, height:7, borderRadius:'50%', background:catColor(d.category), flexShrink:0 }} />
                <span style={{ fontSize:12, color:'var(--text-hi)', flex:1, fontFamily:'var(--font-code)' }}>{d.title}</span>
                <span style={{ fontSize:9, color:'var(--text-lo)', textTransform:'uppercase', letterSpacing:'0.1em' }}>
                  {d.category?.replace('-', ' ')}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginLeft:'auto', fontSize:10, color:'var(--text-lo)', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:'var(--font-code)', display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
        <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--s-learned)', display:'inline-block', animation:'pulse 2s infinite' }} />
        Knowledge Atlas
      </div>
    </header>
  )
}
