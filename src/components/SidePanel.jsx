import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { catColor, CAT_LABELS, STATUS_META, DIFF_META } from '../utils/colors.js'

export default function SidePanel({ node, allNodes, onClose, onNavigateTo }) {
  const navigate = useNavigate()
  const bodyRef  = useRef(null)

  useEffect(() => {
    if (node && bodyRef.current) bodyRef.current.scrollTop = 0
  }, [node?.id])

  const isOpen = !!node

  const related = node
    ? (node.connections || [])
      .map(connection => typeof connection === 'string' ? connection : connection.id)
      .map(id => allNodes.find(n => n.id === id))
      .filter(Boolean)
    : []

  return (
    <aside
      ref={bodyRef}
      style={{
        position:'absolute', top:0, right:0, bottom:0,
        width:'var(--panel-w)',
        background:'var(--bg-panel)',
        borderLeft:'1px solid var(--border-1)',
        overflowY:'auto',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition:'transform 300ms var(--ease)',
        zIndex:50,
        display:'flex', flexDirection:'column',
      }}
    >
      {node && <PanelContent node={node} related={related} onClose={onClose} navigate={navigate} onNavigateTo={onNavigateTo} />}
    </aside>
  )
}

function PanelContent({ node, related, onClose, navigate, onNavigateTo }) {
  const data   = node.data ?? node
  const color  = catColor(data.category)
  const status = STATUS_META[data.status] || STATUS_META['not-started']
  const diff   = DIFF_META[data.difficulty] || DIFF_META.beginner
  const catLbl = CAT_LABELS[data.category] || data.category

  return (
    <div style={{ animation:'slideIn 220ms var(--ease)', flex:1, display:'flex', flexDirection:'column' }}>
      {/* color accent top bar */}
      <div style={{ height:2, background:`linear-gradient(90deg, ${color}, transparent)`, flexShrink:0 }} />

      {/* header */}
      <div style={{ padding:'18px 20px 0', display:'flex', alignItems:'flex-start', gap:10, flexShrink:0 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:10 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:color, boxShadow:`0 0 10px ${color}80` }} />
            <span style={{ fontSize:9, color, letterSpacing:'0.16em', textTransform:'uppercase', fontFamily:'var(--font-code)', fontWeight:700 }}>
              {catLbl}
            </span>
          </div>
          <h2 style={{ fontFamily:'var(--font-ui)', fontWeight:700, fontSize:19, color:'var(--text-hi)', lineHeight:1.2 }}>
            {node.title}
          </h2>
        </div>
        <button
          onClick={onClose}
          style={{ width:28, height:28, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-raised)', border:'1px solid var(--border-1)', borderRadius:4, color:'var(--text-lo)', fontSize:16, flexShrink:0, transition:'all 150ms' }}
          onMouseEnter={e => { e.currentTarget.style.color='var(--text-hi)'; e.currentTarget.style.borderColor='var(--border-2)' }}
          onMouseLeave={e => { e.currentTarget.style.color='var(--text-lo)'; e.currentTarget.style.borderColor='var(--border-1)' }}
        >×</button>
      </div>

      {/* badges */}
      <div style={{ padding:'12px 20px', display:'flex', gap:7, flexShrink:0 }}>
        <Chip label={status.label} color={status.color} bg={status.bg} border={status.border} />
        <Chip label={diff.label}   color={diff.color}   bg={`${diff.color}12`} border={`${diff.color}28`} />
      </div>

      <div style={{ height:1, background:'var(--border-0)', flexShrink:0 }} />

      {/* body */}
      <div style={{ flex:1, padding:'18px 20px', display:'flex', flexDirection:'column', gap:22, overflowY:'auto' }}>

        {/* Summary */}
        <Section label="Overview">
          <p style={{ fontSize:13, color:'var(--text-mid)', lineHeight:1.75 }}>{node.summary || 'No summary yet.'}</p>
        </Section>

        {/* Tags */}
        {node.tags?.length > 0 && (
          <Section label="Tags">
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {node.tags.map(t => (
                <span key={t} style={{ padding:'2px 7px', background:'var(--bg-raised)', border:'1px solid var(--border-1)', borderRadius:3, fontSize:10, color:'var(--text-lo)', fontFamily:'var(--font-code)' }}>
                  #{t}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Connected topics */}
        {related.length > 0 && (
          <Section label={`Connected (${related.length})`}>
            <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
              {related.map(n => (
                <RelatedChip key={n.id} node={n} onClick={() => onNavigateTo(n)} />
              ))}
            </div>
          </Section>
        )}
      </div>

      {/* CTA — always shown */}
      <div style={{ padding:'16px 20px', borderTop:'1px solid var(--border-0)', flexShrink:0, display:'flex', flexDirection:'column', gap:8 }}>
        <button
          onClick={() => navigate(`/topic/${data.id}`)}
          style={{
            width:'100%', padding:'11px', borderRadius:'var(--radius)',
            background:`linear-gradient(135deg, ${color}20, ${color}10)`,
            border:`1px solid ${color}40`,
            color, fontSize:11, fontWeight:700, letterSpacing:'0.1em',
            textTransform:'uppercase', fontFamily:'var(--font-code)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            transition:'all 150ms var(--ease)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${color}28`; e.currentTarget.style.borderColor = `${color}70` }}
          onMouseLeave={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${color}20, ${color}10)`; e.currentTarget.style.borderColor = `${color}40` }}
        >
          {data.parentId ? 'Read Chapter' : 'View Full Note'}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div style={{ padding:'6px 20px 12px', flexShrink:0 }}>
        <span style={{ fontSize:9, color:'var(--text-dim)', fontFamily:'var(--font-code)' }}>{data.id}</span>
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div>
      <div style={{ fontSize:9, color:'var(--text-lo)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:8, fontFamily:'var(--font-code)', fontWeight:700 }}>
        {label}
      </div>
      {children}
    </div>
  )
}

function Chip({ label, color, bg, border }) {
  return (
    <span style={{ padding:'3px 9px', borderRadius:4, fontSize:9, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--font-code)', color, background:bg, border:`1px solid ${border}` }}>
      {label}
    </span>
  )
}

function RelatedChip({ node, onClick }) {
  const data  = node.data ?? node
  const color = catColor(data.category)
  const sm    = STATUS_META[data.status] || STATUS_META['not-started']
  return (
    <button
      onClick={onClick}
      style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 10px', background:'var(--bg-raised)', border:'1px solid var(--border-1)', borderRadius:4, textAlign:'left', transition:'all 150ms var(--ease)', width:'100%' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.background = 'var(--bg-hover)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.background = 'var(--bg-raised)' }}
    >
      <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0 }} />
      <span style={{ fontSize:11, color:'var(--text-hi)', flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{data.title}</span>
      <span style={{ fontSize:9, color:sm.color, fontFamily:'var(--font-code)', flexShrink:0 }}>
        {data.status === 'learned' ? '✓' : data.status === 'in-progress' ? '◑' : '○'}
      </span>
    </button>
  )
}
