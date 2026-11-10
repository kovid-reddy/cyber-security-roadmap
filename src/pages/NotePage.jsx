import React, { useEffect, useMemo, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { catColor, CAT_LABELS, STATUS_META, DIFF_META } from '../utils/colors.js'

export default function NotePage({ graphData }) {
  const params   = useParams()
  const navigate = useNavigate()

  // topic id is everything after /topic/
  const topicId = params['*']
  const node    = graphData.nodes.find(n => n.id === topicId)

  if (!node) return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'var(--bg-void)', gap:16 }}>
      <span style={{ fontSize:48, opacity:0.2 }}>◌</span>
      <p style={{ color:'var(--text-mid)', fontFamily:'var(--font-code)', fontSize:13 }}>Note not found: <code>{topicId}</code></p>
      <button onClick={() => navigate('/')} style={backBtnStyle}>← Back to Atlas</button>
    </div>
  )

  const d = node.data ?? node
  const color  = catColor(d.category)
  const status = STATUS_META[d.status] || STATUS_META['not-started']
  const diff   = DIFF_META[d.difficulty] || DIFF_META.beginner
  const catLbl = CAT_LABELS[d.category] || d.category

  const connected = (d.connections || [])
    .map(connection => typeof connection === 'string' ? connection : connection.id)
    .map(id => graphData.nodes.find(n => n.id === id))
    .filter(Boolean)

  const children = useMemo(() => {
    return graphData.nodes.filter(n => {
      const cData = n.data ?? n
      return cData.parentId === d.id && cData.id !== d.id
    })
  }, [graphData.nodes, d.id])

  const noteBodyRef = useRef(null)

  // Markdown's Mermaid fences are emitted by marked as <pre><code class="language-mermaid">.
  // Convert those blocks into Mermaid containers and render them after the note HTML mounts.
  useEffect(() => {
    const root = noteBodyRef.current
    if (!root) return

    const codeBlocks = Array.from(root.querySelectorAll('pre > code.language-mermaid'))
    if (codeBlocks.length === 0) return

    let cancelled = false

    async function renderDiagrams() {
      try {
        // Load Mermaid only on notes that actually contain Mermaid diagrams.
        const { default: mermaid } = await import(
          /* @vite-ignore */ 'https://cdn.jsdelivr.net/npm/mermaid@12.3.0/dist/mermaid.esm.min.mjs'
        )

        if (cancelled) return

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'default',
        })

        const diagrams = codeBlocks.map(code => {
          const container = document.createElement('div')
          container.className = 'mermaid'
          container.textContent = code.textContent || ''
          code.parentElement.replaceWith(container)
          return container
        })

        for (const diagram of diagrams) {
          if (cancelled) return
          const source = diagram.textContent || ''

          try {
            await mermaid.run({ nodes: [diagram] })
          } catch (error) {
            console.error('Could not render Mermaid diagram:', error)
            const fallback = document.createElement('pre')
            const fallbackCode = document.createElement('code')
            fallbackCode.textContent = source
            fallback.appendChild(fallbackCode)
            diagram.replaceWith(fallback)
          }
        }
      } catch (error) {
        console.error('Could not load Mermaid renderer:', error)
      }
    }

    renderDiagrams()
    return () => {
      cancelled = true
    }
  }, [d.contentHtml, topicId])

  return (
    <div style={{ width:'100vw', height:'100vh', display:'flex', flexDirection:'column', background:'var(--bg-void)' }}>
      {/* Top bar */}
      <header style={{
        height:'var(--nav-h)', flexShrink:0,
        background:'rgba(255,255,255,0.96)', borderBottom:'1px solid var(--border-1)',
        display:'flex', alignItems:'center', padding:'0 24px', gap:16,
        backdropFilter:'blur(12px)', position:'sticky', top:0, zIndex:100,
      }}>
        <button onClick={() => navigate('/')} style={backBtnStyle}>
          ← Atlas
        </button>
        <div style={{ width:1, height:20, background:'var(--border-1)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:color, boxShadow:`0 0 10px ${color}` }} />
          <span style={{ fontSize:11, color, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-code)', fontWeight:600 }}>{catLbl}</span>
        </div>
        <span style={{ fontSize:13, color:'var(--text-mid)', marginLeft:'auto', fontFamily:'var(--font-code)' }}>
          {d.id}
        </span>
      </header>

      {/* Scrollable content */}
      <div className="scrollable" style={{ flex:1 }}>
        <div style={{ maxWidth:860, margin:'0 auto', padding:'40px 32px 80px' }}>

          {/* Hero */}
          <div style={{ marginBottom:40, animation:'fadeUp 300ms var(--ease)' }}>
            <div style={{
              height:3, width:'100%',
              background:`linear-gradient(90deg, ${color} 0%, transparent 70%)`,
              marginBottom:28, borderRadius:2,
            }} />
            <h1 style={{
              fontFamily:'var(--font-ui)', fontWeight:800,
              fontSize:'clamp(28px, 4vw, 44px)',
              color:'var(--text-hi)', lineHeight:1.1, marginBottom:16,
            }}>{d.title}</h1>

            <p style={{ fontSize:16, color:'var(--text-mid)', lineHeight:1.7, maxWidth:640, marginBottom:24 }}>
              {d.summary}
            </p>

            <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
              <Badge label={status.label} color={status.color} bg={status.bg} border={status.border} />
              <Badge label={diff.label}   color={diff.color}   bg={`${diff.color}12`} border={`${diff.color}30`} />
              {(d.tags||[]).map(t => (
                <span key={t} style={{ padding:'3px 8px', background:'var(--bg-card)', border:'1px solid var(--border-1)', borderRadius:3, fontSize:11, color:'var(--text-lo)', fontFamily:'var(--font-code)' }}>#{t}</span>
              ))}
            </div>
          </div>

          {/* Rendered markdown content */}
          <div
            ref={noteBodyRef}
            className="note-body"
            style={{ animation:'fadeUp 300ms 80ms var(--ease) both' }}
            dangerouslySetInnerHTML={{ __html: d.contentHtml || '<p style="color:var(--text-lo)">No content yet.</p>' }}
          />

          {/* Subtopics / Chapters list */}
          {children.length > 0 && (
            <section style={{ marginTop:48, animation:'fadeUp 300ms 100ms var(--ease) both' }}>
              <SectionLabel color={color}>Chapters & Subtopics</SectionLabel>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:32 }}>
                {children.map(child => {
                  const cData = child.data ?? child
                  const cStatus = STATUS_META[cData.status] || STATUS_META['not-started']
                  const cDiff = DIFF_META[cData.difficulty] || DIFF_META.beginner
                  return (
                    <Link
                      key={cData.id}
                      to={`/topic/${cData.id}`}
                      style={{
                        display:'flex', alignItems:'center', gap:16, padding:'14px 18px',
                        background:'var(--bg-card)', border:'1px solid var(--border-1)',
                        borderRadius:'var(--radius)', textDecoration:'none',
                        transition:'all 150ms var(--ease)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.background = 'var(--bg-raised)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.background = 'var(--bg-card)' }}
                    >
                      <div style={{ display:'flex', flexDirection:'column', flex:1, gap:4 }}>
                        <span style={{ fontSize:14, color:'var(--text-hi)', fontWeight:600 }}>
                          {cData.title}
                        </span>
                        {cData.summary && (
                          <span style={{ fontSize:12, color:'var(--text-lo)', lineHeight:1.5 }}>
                            {cData.summary}
                          </span>
                        )}
                      </div>
                      <div style={{ display:'flex', gap:6, flexShrink:0, alignItems:'center' }}>
                        <Badge label={cStatus.label} color={cStatus.color} bg={cStatus.bg} border={cStatus.border} />
                        <Badge label={cDiff.label} color={cDiff.color} bg={`${cDiff.color}12`} border={`${cDiff.color}30`} />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}

          {/* Connected topics */}
          {connected.length > 0 && (
            <div style={{ marginTop:56, animation:'fadeUp 300ms 120ms var(--ease) both' }}>
              <SectionLabel color={color}>Connected Topics</SectionLabel>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:10 }}>
                {connected.map(n => <ConnectedCard key={n.id} node={n} />)}
              </div>
            </div>
          )}

          {/* Back */}
          <div style={{ marginTop:64, paddingTop:32, borderTop:'1px solid var(--border-0)' }}>
            <button onClick={() => navigate('/')} style={{
              ...backBtnStyle,
              padding:'10px 20px', fontSize:13,
              border:'1px solid var(--border-2)',
            }}>
              ← Back to Knowledge Graph
            </button>
          </div>
        </div>
      </div>

      <style>{noteBodyCSS}</style>
    </div>
  )
}

function Badge({ label, color, bg, border }) {
  return (
    <span style={{
      padding:'4px 10px', borderRadius:4, fontSize:10, fontWeight:700,
      letterSpacing:'0.1em', textTransform:'uppercase', fontFamily:'var(--font-code)',
      color, background:bg, border:`1px solid ${border}`,
    }}>{label}</span>
  )
}

function SectionLabel({ color, children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
      <div style={{ width:3, height:16, background:color, borderRadius:2 }} />
      <span style={{ fontSize:10, color:'var(--text-lo)', letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'var(--font-code)', fontWeight:700 }}>
        {children}
      </span>
    </div>
  )
}

function ConnectedCard({ node }) {
  const navigate = useNavigate()
  const d = node.data ?? node
  const color = catColor(d.category)
  const sm = STATUS_META[d.status] || STATUS_META['not-started']

  return (
    <button
      onClick={() => navigate(`/topic/${d.id}`)}
      style={{
        padding:'12px 14px', background:'var(--bg-card)',
        border:'1px solid var(--border-1)', borderRadius:'var(--radius)',
        textAlign:'left', transition:'all 150ms var(--ease)',
        display:'flex', flexDirection:'column', gap:6,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color + '44'; e.currentTarget.style.background = 'var(--bg-raised)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-1)'; e.currentTarget.style.background = 'var(--bg-card)' }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:7 }}>
        <div style={{ width:6, height:6, borderRadius:'50%', background:color, flexShrink:0 }} />
        <span style={{ fontSize:12, color:'var(--text-hi)', fontWeight:600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {d.title}
        </span>
      </div>
      <span style={{ fontSize:10, color:sm.color, fontFamily:'var(--font-code)' }}>
        {sm.label}
      </span>
    </button>
  )
}

const backBtnStyle = {
  display:'inline-flex', alignItems:'center', gap:6,
  padding:'6px 12px', borderRadius:'var(--radius)',
  fontSize:11, fontFamily:'var(--font-code)', fontWeight:600,
  color:'var(--text-mid)', letterSpacing:'0.06em',
  border:'1px solid var(--border-1)',
  transition:'all 150ms var(--ease)',
}

const noteBodyCSS = `
  .note-body {
    font-family: var(--font-ui);
    font-size: 15px;
    color: var(--text-mid);
    line-height: 1.8;
  }
  .note-body h2 {
    font-family: var(--font-ui);
    font-size: 20px;
    font-weight: 700;
    color: var(--text-hi);
    margin: 40px 0 14px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-1);
  }
  .note-body h3 {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-hi);
    margin: 28px 0 10px;
    letter-spacing: 0.03em;
  }
  .note-body p {
    margin-bottom: 16px;
    max-width: 680px;
  }
  .note-body ul, .note-body ol {
    margin: 0 0 16px 20px;
    max-width: 680px;
  }
  .note-body li {
    margin-bottom: 6px;
  }
  .note-body strong {
    color: var(--text-hi);
    font-weight: 600;
  }
  .note-body code {
    font-family: var(--font-code);
    font-size: 12px;
    background: var(--bg-raised);
    border: 1px solid var(--border-1);
    border-radius: 3px;
    padding: 1px 5px;
    color: var(--accent);
  }
  .note-body pre {
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-radius: var(--radius);
    padding: 20px;
    overflow-x: auto;
    margin: 20px 0;
    position: relative;
  }
  .note-body pre::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    border-radius: var(--radius) var(--radius) 0 0;
  }
  .note-body pre code {
    background: none;
    border: none;
    padding: 0;
    font-size: 13px;
    color: var(--text-mid);
    line-height: 1.6;
  }
  .note-body table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 13px;
  }
  .note-body th {
    font-family: var(--font-code);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-lo);
    padding: 8px 12px;
    border-bottom: 1px solid var(--border-2);
    text-align: left;
  }
  .note-body td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--border-0);
    color: var(--text-mid);
    vertical-align: top;
  }
  .note-body tr:last-child td { border-bottom: none; }
  .note-body tr:hover td { background: var(--bg-raised); }
  .note-body blockquote {
    border-left: 2px solid var(--accent);
    margin: 20px 0;
    padding: 12px 20px;
    background: var(--accent-dim);
    border-radius: 0 var(--radius) var(--radius) 0;
    color: var(--text-hi);
    font-style: italic;
  }
  .note-body a { color: var(--accent); text-decoration: none; }
  .note-body a:hover { text-decoration: underline; }
  .note-body img {
    max-width: 100%;
    border-radius: var(--radius);
    border: 1px solid var(--border-1);
    margin: 16px 0;
  }
  .note-body .mermaid {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 24px 0;
    padding: 18px;
    background: var(--bg-card);
    border: 1px solid var(--border-1);
    border-radius: var(--radius);
    overflow-x: auto;
  }
  .note-body .mermaid svg {
    display: block;
    max-width: 100%;
    height: auto;
  }
`
