'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

const SAVINGS_TICKER = ['$47/mo on Comcast', '$180/mo on rent', '$28/mo on AT&T', '$62/mo on insurance', '$34/mo on T-Mobile', '$95/mo on Spectrum']

const BILL_CATEGORIES = [
  { icon: '🏠', label: 'Rent', desc: 'Negotiate lease renewal or move-in rate', color: '#10b981' },
  { icon: '📱', label: 'Phone', desc: 'AT&T, T-Mobile, Verizon, EE, O2', color: '#3b82f6' },
  { icon: '🌐', label: 'Internet', desc: 'Comcast, Spectrum, Virgin Media', color: '#8b5cf6' },
  { icon: '🛡️', label: 'Insurance', desc: 'Auto, home, renters, health', color: '#f59e0b' },
  { icon: '📺', label: 'Subscriptions', desc: 'Streaming, gym, software, memberships', color: '#ec4899' },
  { icon: '⚡', label: 'Utilities', desc: 'Electric, gas, water providers', color: '#06b6d4' },
  { icon: '💳', label: 'Credit Cards', desc: 'APR reduction, fee waivers', color: '#f97316' },
  { icon: '🚗', label: 'Car Payments', desc: 'Refinance, dealership loyalty deals', color: '#84cc16' },
]

const STEPS = [
  { n: '01', title: 'Pick your bill', desc: 'Rent, phone, internet, insurance — any recurring cost' },
  { n: '02', title: 'Tell us your situation', desc: 'Provider, amount, how long you\'ve been a customer' },
  { n: '03', title: 'Get your script', desc: 'AI writes word-for-word email or call script' },
  { n: '04', title: 'Send. Save.', desc: 'Track outcomes. Average saving: $40/mo' },
]

export default function Home() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [tickerVisible, setTickerVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false)
      setTimeout(() => {
        setTickerIndex(i => (i + 1) % SAVINGS_TICKER.length)
        setTickerVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11, 17, 32, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', color: '#f1f5f9' }}>
          Bill<span style={{ color: '#10b981' }}>Slash</span>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/negotiate" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            Negotiate
          </Link>
          <Link href="/savings" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            Savings Board
          </Link>
          <Link href="/negotiate" className="btn-primary" style={{ padding: '8px 16px', fontSize: 14, borderRadius: 8, textDecoration: 'none', display: 'inline-block' }}>
            Try Free →
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section style={{
          maxWidth: 1200, margin: '0 auto', padding: '80px 24px 64px',
          display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'center',
        }}>
          <div>
            {/* Live ticker */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24,
              background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 999, padding: '6px 14px',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#10b981',
                boxShadow: '0 0 8px rgba(16,185,129,0.6)', display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, color: '#94a3b8' }}>Latest: </span>
              <span style={{
                fontSize: 13, fontWeight: 600, color: '#10b981',
                transition: 'opacity 0.3s, transform 0.3s',
                opacity: tickerVisible ? 1 : 0,
                transform: tickerVisible ? 'translateY(0)' : 'translateY(4px)',
              }}>
                Someone saved {SAVINGS_TICKER[tickerIndex]}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 900,
              lineHeight: 1.08, letterSpacing: '-1.5px', color: '#f1f5f9', marginBottom: 20,
            }}>
              Stop overpaying.<br />
              <span style={{ color: '#10b981' }}>AI writes your</span><br />
              negotiation script.
            </h1>

            <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6, marginBottom: 32, maxWidth: 480 }}>
              Rent too high. Phone bill creeping up. Internet provider ignoring you. BillSlash generates word-for-word scripts — email or phone — for any recurring bill. Copy. Send. Save.
            </p>

            <div style={{ display: 'flex', gap: 32, marginBottom: 36 }}>
              {[{ val: '$40', label: 'avg saved/mo' }, { val: '8', label: 'bill categories' }, { val: '2 min', label: 'to generate' }].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981', letterSpacing: '-0.5px' }}>{s.val}</div>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/negotiate" className="btn-primary" style={{ padding: '14px 28px', fontSize: 16, borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
                Start negotiating — it&apos;s free →
              </Link>
              <Link href="/savings" className="btn-ghost" style={{ padding: '14px 28px', fontSize: 16, borderRadius: 10, textDecoration: 'none', display: 'inline-block' }}>
                See real savings
              </Link>
            </div>

            <p style={{ fontSize: 12, color: '#475569', marginTop: 12 }}>
              2 free negotiations/month. No credit card. Pro: $9/mo for unlimited.
            </p>
          </div>

          {/* Right: Animated bill card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              background: '#111827', border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: 16, padding: 24,
              animation: 'floatBill 4s ease-in-out infinite',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(16, 185, 129, 0.05)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#475569', marginBottom: 4 }}>Comcast Xfinity</div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: '#f1f5f9' }}>$147<span style={{ fontSize: 14, color: '#64748b' }}>/mo</span></div>
                </div>
                <span className="pill pill-amber">Before</span>
              </div>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>AI Script Generated ✓</div>
              <div style={{
                background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.15)',
                borderRadius: 8, padding: '10px 12px', fontSize: 12, color: '#94a3b8', lineHeight: 1.6,
              }}>
                &quot;Hi, I&apos;ve been a loyal Xfinity customer for 3 years. I noticed my current rate increased...&quot;
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>New rate: $99/mo</span>
                <span className="pill pill-emerald">Saved $48/mo</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BILL_CATEGORIES.slice(0, 6).map(cat => (
                <div key={cat.label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#94a3b8',
                }}>
                  <span>{cat.icon}</span>{cat.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @media (max-width: 768px) {
            section { grid-template-columns: 1fr !important; }
            section > div:last-child { display: none !important; }
          }
        `}</style>

        {/* Bill categories */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
            Works on every recurring bill
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {BILL_CATEGORIES.map((cat, i) => (
              <Link key={cat.label} href={`/negotiate?type=${cat.label.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '16px 18px', cursor: 'pointer',
                    transition: 'border-color 150ms, background 150ms',
                    animation: `fadeUp 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.05}s both`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = cat.color + '40'
                    el.style.background = '#1a2332'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.borderColor = 'rgba(255,255,255,0.06)'
                    el.style.background = '#111827'
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{cat.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f1f5f9', marginBottom: 4 }}>{cat.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{cat.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(17, 24, 39, 0.5)',
          padding: '64px 24px',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, textAlign: 'center', marginBottom: 48, letterSpacing: '-0.5px' }}>
              From bill to script in 2 minutes
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
              {STEPS.map((step, i) => (
                <div key={step.n} style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: `fadeUp 0.4s cubic-bezier(0.23,1,0.32,1) ${i * 0.08}s both` }}>
                  <div style={{
                    width: 40, height: 40, background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: '#10b981',
                  }}>
                    {step.n}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.03) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 20, padding: '48px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap',
          }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>
                Your next bill is due soon.
              </h2>
              <p style={{ color: '#94a3b8', fontSize: 16 }}>Don&apos;t just pay it. Negotiate it. Takes 2 minutes.</p>
            </div>
            <Link href="/negotiate" className="btn-primary" style={{ padding: '14px 32px', fontSize: 16, borderRadius: 10, textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
              Get my script — free →
            </Link>
          </div>
        </section>
      </main>

      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)', padding: '24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 12, maxWidth: 1200, margin: '0 auto',
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9' }}>Bill<span style={{ color: '#10b981' }}>Slash</span></span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Negotiate', 'Savings Board', 'Privacy'].map(l => (
            <Link key={l} href={`/${l.toLowerCase().replace(' ', '-')}`} style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}>{l}</Link>
          ))}
        </div>
        <span style={{ fontSize: 12, color: '#334155' }}>© 2026 BillSlash</span>
      </footer>
    </>
  )
}
