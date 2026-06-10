'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const BILL_TYPES = [
  { id: 'rent', icon: '🏠', label: 'Rent', desc: 'Lease renewal or move-in negotiation' },
  { id: 'phone', icon: '📱', label: 'Phone', desc: 'Mobile plan cost reduction' },
  { id: 'internet', icon: '🌐', label: 'Internet', desc: 'Broadband bill reduction' },
  { id: 'insurance', icon: '🛡️', label: 'Insurance', desc: 'Auto, home, renters, health' },
  { id: 'subscriptions', icon: '📺', label: 'Subscriptions', desc: 'Streaming, gym, software' },
  { id: 'utilities', icon: '⚡', label: 'Utilities', desc: 'Electric, gas, water' },
  { id: 'credit-cards', icon: '💳', label: 'Credit Cards', desc: 'APR reduction, fee waivers' },
  { id: 'car-payments', icon: '🚗', label: 'Car Payments', desc: 'Refinance or loyalty deals' },
]

function NegotiateContent() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get('type') || ''

  const [step, setStep] = useState<'pick' | 'form' | 'result'>(initialType ? 'form' : 'pick')
  const [billType, setBillType] = useState(initialType)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [script, setScript] = useState('')
  const [formData, setFormData] = useState({
    provider: '',
    currentAmount: '',
    yearsCustomer: '',
    reason: '',
    scriptType: 'email' as 'email' | 'phone',
  })

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStep('result')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billType, ...formData }),
      })
      const data = await res.json()
      if (data.script) setScript(data.script)
      else setScript('Error generating script. Please try again.')
    } catch {
      setScript('Error generating script. Please try again.')
    }
    setLoading(false)
  }

  function handleCopy() {
    navigator.clipboard.writeText(script)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedBill = BILL_TYPES.find(b => b.id === billType)

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11, 17, 32, 0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 24px', height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.5px', color: '#f1f5f9', textDecoration: 'none' }}>
          Bill<span style={{ color: '#10b981' }}>Slash</span>
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          {['pick', 'form', 'result'].map((s, i) => (
            <div key={s} style={{
              width: 24, height: 4, borderRadius: 2,
              background: ['pick', 'form', 'result'].indexOf(step) >= i ? '#10b981' : 'rgba(255,255,255,0.1)',
              transition: 'background 300ms',
            }} />
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 24px' }}>

        {/* Step 1: Pick bill type */}
        {step === 'pick' && (
          <div style={{ animation: 'fadeUp 0.3s cubic-bezier(0.23,1,0.32,1) both' }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 8 }}>
              What bill do you want to slash?
            </h1>
            <p style={{ color: '#64748b', marginBottom: 32 }}>Pick the type — we&apos;ll generate a targeted script.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {BILL_TYPES.map(bt => (
                <button
                  key={bt.id}
                  onClick={() => { setBillType(bt.id); setStep('form') }}
                  style={{
                    background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 12, padding: '16px', cursor: 'pointer',
                    textAlign: 'left', transition: 'border-color 150ms, background 150ms',
                    color: 'inherit',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget).style.borderColor = 'rgba(16,185,129,0.3)'
                    ;(e.currentTarget).style.background = '#1a2332'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.06)'
                    ;(e.currentTarget).style.background = '#111827'
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{bt.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f5f9', marginBottom: 2 }}>{bt.label}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>{bt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'form' && (
          <div style={{ animation: 'fadeUp 0.3s cubic-bezier(0.23,1,0.32,1) both' }}>
            <button
              onClick={() => setStep('pick')}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ← Back
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>{selectedBill?.icon}</span>
              <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px' }}>
                {selectedBill?.label} Negotiation
              </h1>
            </div>
            <p style={{ color: '#64748b', marginBottom: 32 }}>
              Tell us your situation — the more detail, the stronger the script.
            </p>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                  Provider / Company name
                </label>
                <input
                  className="input-field"
                  placeholder={billType === 'rent' ? 'e.g. Skyline Apartments' : 'e.g. Comcast Xfinity'}
                  value={formData.provider}
                  onChange={e => setFormData(f => ({ ...f, provider: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                  Current monthly amount ($)
                </label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="e.g. 147"
                  value={formData.currentAmount}
                  onChange={e => setFormData(f => ({ ...f, currentAmount: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                  {billType === 'rent' ? 'Years at this address' : 'Years as a customer'}
                </label>
                <input
                  className="input-field"
                  type="number"
                  placeholder="e.g. 3"
                  value={formData.yearsCustomer}
                  onChange={e => setFormData(f => ({ ...f, yearsCustomer: e.target.value }))}
                  required
                  style={{ width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8 }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                  Why should they reduce your rate? (optional but powerful)
                </label>
                <textarea
                  className="input-field"
                  placeholder={billType === 'rent' ? 'e.g. No missed payments, great tenant, renewing early' : 'e.g. Seen competitor ads for $89/mo, no contract violations, always paid on time'}
                  value={formData.reason}
                  onChange={e => setFormData(f => ({ ...f, reason: e.target.value }))}
                  rows={3}
                  style={{ width: '100%', padding: '10px 12px', fontSize: 14, borderRadius: 8, resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: 8 }}>
                  Script format
                </label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {(['email', 'phone'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(f => ({ ...f, scriptType: type }))}
                      style={{
                        flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600,
                        border: formData.scriptType === type ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)',
                        background: formData.scriptType === type ? 'rgba(16,185,129,0.1)' : '#111827',
                        color: formData.scriptType === type ? '#10b981' : '#64748b',
                        transition: 'all 150ms',
                      }}
                    >
                      {type === 'email' ? '✉️ Email script' : '📞 Phone script'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '14px', fontSize: 16, borderRadius: 10, width: '100%', marginTop: 8 }}
              >
                Generate my negotiation script →
              </button>
            </form>

            <p style={{ fontSize: 12, color: '#334155', textAlign: 'center', marginTop: 12 }}>
              2 free scripts/month · No account required
            </p>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 'result' && (
          <div style={{ animation: 'fadeUp 0.3s cubic-bezier(0.23,1,0.32,1) both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ fontSize: 28 }}>{selectedBill?.icon}</span>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.5px' }}>Your negotiation script</h1>
                <p style={{ fontSize: 13, color: '#64748b' }}>{selectedBill?.label} · {formData.scriptType === 'email' ? 'Email' : 'Phone'} · {formData.provider}</p>
              </div>
            </div>

            {loading ? (
              <div style={{ background: '#111827', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
                  <div className="shimmer-loading" style={{ width: 20, height: 20, borderRadius: '50%' }} />
                  <span style={{ fontSize: 14, color: '#64748b' }}>Generating your script...</span>
                </div>
                {[100, 85, 92, 78, 95].map((w, i) => (
                  <div key={i} className="shimmer-loading" style={{ height: 14, borderRadius: 4, marginBottom: 8, width: `${w}%` }} />
                ))}
              </div>
            ) : (
              <>
                <div style={{
                  background: '#111827', border: '1px solid rgba(16,185,129,0.15)',
                  borderRadius: 12, padding: 20, marginBottom: 16,
                  fontSize: 14, color: '#e2e8f0', lineHeight: 1.7,
                  whiteSpace: 'pre-wrap', fontFamily: 'inherit',
                }}>
                  {script}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={handleCopy}
                    className="btn-primary"
                    style={{ flex: 1, padding: '12px', fontSize: 14, borderRadius: 8 }}
                  >
                    {copied ? '✓ Copied!' : 'Copy script'}
                  </button>
                  <button
                    onClick={() => { setStep('form'); setScript('') }}
                    className="btn-ghost"
                    style={{ padding: '12px 20px', fontSize: 14, borderRadius: 8 }}
                  >
                    Edit details
                  </button>
                </div>

                <div style={{
                  background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)',
                  borderRadius: 10, padding: '14px 16px', marginTop: 16,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#10b981', marginBottom: 4 }}>💡 Pro tips</div>
                  <ul style={{ fontSize: 13, color: '#64748b', paddingLeft: 16, lineHeight: 1.8 }}>
                    <li>Send during business hours for best response rate</li>
                    <li>If no reply in 3 days, follow up once</li>
                    <li>Mention specific competitor prices if you have them</li>
                    <li>Be polite but firm — loyalty is valuable to them</li>
                  </ul>
                </div>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <button
                    onClick={() => { setStep('pick'); setScript(''); setBillType(''); setFormData({ provider: '', currentAmount: '', yearsCustomer: '', reason: '', scriptType: 'email' }) }}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 14 }}
                  >
                    Negotiate another bill →
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </>
  )
}

export default function NegotiatePage() {
  return (
    <Suspense fallback={<div style={{ padding: 48, textAlign: 'center', color: '#64748b' }}>Loading...</div>}>
      <NegotiateContent />
    </Suspense>
  )
}
