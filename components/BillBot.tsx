'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function BillBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm BillBot 💚 Ask me anything about negotiating your bills." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const next = [...messages, userMsg]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages(m => [...m, { role: 'assistant', content: data.content || 'Sorry, try again.' }])
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'Connection error. Try again.' }])
    }
    setLoading(false)
  }

  const BOTTOM_OFFSET = 84
  const panelStyle: React.CSSProperties = isMobile ? {
    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9998,
    width: '100%', height: `calc(100dvh - ${BOTTOM_OFFSET}px)`,
    borderRadius: '16px 16px 0 0',
    background: '#0f1a2e', border: '1px solid rgba(16,185,129,0.25)',
    boxShadow: '0 -8px 40px rgba(0,0,0,0.8)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    animation: 'billbot-slide-bottom 0.3s cubic-bezier(0.23,1,0.32,1)',
  } : {
    position: 'fixed', bottom: 88, right: 24, zIndex: 9998,
    width: 360, height: 500, borderRadius: 16,
    background: '#0f1a2e', border: '1px solid rgba(16,185,129,0.25)',
    boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    animation: 'billbot-slide-up 0.22s ease-out',
  }

  return (
    <>
      <style>{`
        @keyframes billbot-slide-up { from { transform:translateY(16px); opacity:0; } to { transform:translateY(0); opacity:1; } }
        @keyframes billbot-slide-bottom { from { transform:translateY(100%); } to { transform:translateY(0); } }
      `}</style>

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 52, height: 52, borderRadius: '50%',
          background: '#10b981', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
          transition: 'transform 150ms, box-shadow 150ms',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        aria-label="Open BillBot"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div style={panelStyle}>
          {/* Header */}
          <div style={{ flexShrink: 0, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>💚</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>BillBot</div>
              <div style={{ fontSize: 11, color: '#10b981' }}>● Online — bill negotiation expert</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '8px 12px', borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: m.role === 'user' ? '#10b981' : 'rgba(255,255,255,0.06)',
                  color: m.role === 'user' ? '#000' : '#e2e8f0',
                  fontSize: 13, lineHeight: 1.5,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 4, padding: '8px 12px' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: `billbot-slide-up 0.6s ${i * 0.15}s infinite alternate` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ flexShrink: 0, padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8, paddingBottom: `max(10px, env(safe-area-inset-bottom))` }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask about negotiating any bill..."
              style={{
                flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '8px 12px', color: '#f1f5f9', outline: 'none',
                fontSize: isMobile ? 16 : 13.5,
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              style={{
                background: '#10b981', border: 'none', borderRadius: 8,
                width: 36, height: 36, cursor: 'pointer', fontSize: 16,
                opacity: !input.trim() || loading ? 0.5 : 1,
                transition: 'opacity 150ms, transform 100ms',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.95)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}
