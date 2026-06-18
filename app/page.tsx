'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const BILL_CATEGORIES = [
  { icon: '🏠', label: 'Rent', color: '#2563eb' },
  { icon: '📱', label: 'Phone', color: '#7c3aed' },
  { icon: '🌐', label: 'Internet', color: '#0891b2' },
  { icon: '🛡️', label: 'Insurance', color: '#d97706' },
  { icon: '📺', label: 'Subscriptions', color: '#dc2626' },
  { icon: '⚡', label: 'Utilities', color: '#16a34a' },
  { icon: '💳', label: 'Credit Cards', color: '#9333ea' },
  { icon: '🚗', label: 'Car Payments', color: '#0369a1' },
]

const DEMO_LINES = [
  "Hi, I've been a Comcast customer for 3 years.",
  "I recently received a promotional offer from Spectrum",
  "for $65/month — $47 less than my current rate.",
  "I'd like to discuss matching or beating that offer,",
  "otherwise I'll need to switch providers next week.",
  "",
  "— Result: Rate reduced to $89/mo. Saved $58/mo. ✓",
]

const STEPS = [
  { n: 1, title: 'Pick your bill', desc: 'Rent, phone, internet, insurance, any recurring cost' },
  { n: 2, title: 'Add your details', desc: "Provider, current amount, how long you've been a customer" },
  { n: 3, title: 'Get your script', desc: 'AI writes a word-for-word email or call script' },
  { n: 4, title: 'Send and save', desc: 'Copy, send, track your outcome' },
]


function DemoPanel() {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [displayed, setDisplayed] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (lineIndex >= DEMO_LINES.length - 1) {
      setTimeout(() => setShowResult(true), 400)
      return
    }
    const line = DEMO_LINES[lineIndex]
    if (charIndex < line.length) {
      timerRef.current = setTimeout(() => setCharIndex(c => c + 1), 28)
    } else {
      timerRef.current = setTimeout(() => {
        setDisplayed(d => [...d, line])
        setCharIndex(0)
        setLineIndex(i => i + 1)
      }, line === '' ? 120 : 220)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [lineIndex, charIndex])

  const currentLine = lineIndex < DEMO_LINES.length - 1 ? DEMO_LINES[lineIndex].slice(0, charIndex) : ''

  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(15,23,42,0.1)',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 8px 40px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.04)',
    }}>
      {/* Header bar */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid rgba(15,23,42,0.07)',
        padding: '12px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: 'rgba(37,99,235,0.1)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>🌐</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Comcast Xfinity — $147/mo</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>Internet · 3 years customer</div>
          </div>
        </div>
        <span className="pill pill-blue" style={{ fontSize: 11 }}>AI Script</span>
      </div>

      {/* Script body */}
      <div style={{ padding: '18px 20px', minHeight: 180 }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10, fontWeight: 500 }}>
          Generated negotiation email
        </div>
        <div style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: 12.5, lineHeight: 1.7, color: '#334155',
        }}>
          {displayed.map((line, i) => (
            <div key={i}>{line || <br />}</div>
          ))}
          {lineIndex < DEMO_LINES.length - 1 && (
            <span>
              {currentLine}
              <span style={{ animation: 'blink 1s step-end infinite', borderLeft: '2px solid #2563eb', marginLeft: 1 }}>&nbsp;</span>
            </span>
          )}
        </div>
      </div>

      {/* Result badge */}
      {showResult && (
        <div style={{
          margin: '0 18px 18px',
          background: 'rgba(22,163,74,0.06)',
          border: '1px solid rgba(22,163,74,0.2)',
          borderRadius: 10, padding: '12px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          animation: 'savingsPop 0.4s cubic-bezier(0.23,1,0.32,1) forwards',
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 2 }}>Rate reduced</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
              $147 → $89/mo
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#16a34a' }}>$58/mo</div>
            <div style={{ fontSize: 11, color: '#94a3b8' }}>saved</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(248,250,252,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(15,23,42,0.07)',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.5px', color: '#0f172a' }}>
          Bill<span style={{ color: '#2563eb' }}>Slash</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/negotiate" style={{ color: '#475569', textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '6px 10px' }}>
            Negotiate
          </Link>
          <Link href="/negotiate" className="btn-primary" style={{ padding: '8px 18px', fontSize: 14, borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>
            Try free →
          </Link>
        </div>
      </nav>

      <main style={{ background: '#f8fafc' }}>
        {/* Hero */}
        <section style={{
          maxWidth: 1160, margin: '0 auto', padding: '72px 24px 56px',
          display: 'grid', gridTemplateColumns: '1fr 440px', gap: 72, alignItems: 'center',
        }}>
          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
              background: '#fff', border: '1px solid rgba(15,23,42,0.08)',
              borderRadius: 999, padding: '5px 14px',
              boxShadow: '0 1px 4px rgba(15,23,42,0.06)',
            }}>
              <span style={{ fontSize: 14 }}>✂️</span>
              <span style={{ fontSize: 13, color: '#475569', fontWeight: 500 }}>
                AI writes your negotiation script
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 58px)', fontWeight: 900,
              lineHeight: 1.06, letterSpacing: '-1.5px', color: '#0f172a', marginBottom: 20,
            }}>
              Stop overpaying.<br />
              <span style={{ color: '#2563eb' }}>Get the script.</span><br />
              Cut your bills.
            </h1>

            <p style={{ fontSize: 17, color: '#475569', lineHeight: 1.65, marginBottom: 32, maxWidth: 440 }}>
              BillSlash generates word-for-word negotiation scripts for rent, phone, internet, insurance, and more. Copy, send, save hundreds per year.
            </p>

            {/* Feature pills row */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
              {[
                { label: '✂️ AI-powered scripts', color: '#2563eb' },
                { label: '📋 8 bill categories', color: '#0891b2' },
                { label: '⚡ Ready in 2 minutes', color: '#16a34a' },
                { label: '🔒 No account needed', color: '#7c3aed' },
              ].map(p => (
                <span key={p.label} style={{
                  fontSize: 12, fontWeight: 600,
                  padding: '5px 12px', borderRadius: 99,
                  background: 'rgba(15,23,42,0.04)',
                  border: '1px solid rgba(15,23,42,0.08)',
                  color: p.color,
                }}>
                  {p.label}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <Link href="/negotiate" className="btn-primary" style={{ padding: '13px 26px', fontSize: 15, borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
                Start negotiating — free →
              </Link>
              <Link href="/negotiate" className="btn-ghost" style={{ padding: '13px 22px', fontSize: 15, borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
                See how it works
              </Link>
            </div>
            <p style={{ fontSize: 12, color: '#94a3b8' }}>2 free scripts/month. No credit card.</p>
            <p className="text-xs opacity-60 mt-2">Have a promo code? <a href="#promo" className="underline">Apply here</a></p>
          </div>

          {/* Right: animated demo */}
          <DemoPanel />
        </section>


        {/* Bill categories */}
        <section style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 56px' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 8 }}>
              Works on every recurring bill
            </h2>
            <p style={{ fontSize: 15, color: '#64748b' }}>Pick your bill type and we'll generate the right script for that provider.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
            {BILL_CATEGORIES.map((cat, i) => (
              <Link key={cat.label} href={`/negotiate?type=${cat.label.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', border: '1px solid rgba(15,23,42,0.08)',
                  borderRadius: 12, padding: '18px 18px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                  transition: 'border-color 150ms, box-shadow 150ms, transform 100ms',
                  animation: `fadeUp 0.35s cubic-bezier(0.23,1,0.32,1) ${i * 0.04}s both`,
                  boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = cat.color + '40'
                    el.style.boxShadow = `0 4px 16px rgba(15,23,42,0.08)`
                    el.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(15,23,42,0.08)'
                    el.style.boxShadow = '0 1px 3px rgba(15,23,42,0.04)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{cat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{
          background: '#fff',
          borderTop: '1px solid rgba(15,23,42,0.06)',
          borderBottom: '1px solid rgba(15,23,42,0.06)',
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px', marginBottom: 40, textAlign: 'center' }}>
              From bill to script in 2 minutes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {STEPS.map((step, i) => (
                <div key={step.n} style={{
                  display: 'flex', flexDirection: 'column', gap: 10,
                  animation: `fadeUp 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.07}s both`,
                }}>
                  <div style={{
                    width: 36, height: 36,
                    background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
                    borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 700, color: '#2563eb',
                  }}>
                    {step.n}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px' }}>
          <div style={{
            background: '#2563eb',
            borderRadius: 20, padding: '52px 48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8, color: '#fff' }}>
                Your next bill is due soon.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16 }}>Don't just pay it. Get the script, negotiate it down.</p>
            </div>
            <Link href="/negotiate" style={{
              background: '#fff', color: '#2563eb',
              fontWeight: 700, padding: '14px 32px', fontSize: 15,
              borderRadius: 10, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap',
              transition: 'box-shadow 150ms, transform 100ms',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)' }}
            >
              Get my free script →
            </Link>
          </div>
        </section>
      </main>

      <footer style={{
        borderTop: '1px solid rgba(15,23,42,0.07)', padding: '24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 1160, margin: '0 auto',
        background: '#f8fafc',
      }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>Bill<span style={{ color: '#2563eb' }}>Slash</span></span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Negotiate', 'Privacy'].map(l => (
            <Link key={l} href={`/${l.toLowerCase()}`} style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontSize: 12, color: '#cbd5e1' }}>© 2026 BillSlash</span>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          section:first-of-type { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </>
  )
}
