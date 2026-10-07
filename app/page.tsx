'use client'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'

const BILLS = [
  { icon: '🏠', label: 'Rent' },
  { icon: '📱', label: 'Phone' },
  { icon: '🌐', label: 'Internet' },
  { icon: '🛡️', label: 'Insurance' },
  { icon: '📺', label: 'Subscriptions' },
  { icon: '⚡', label: 'Utilities' },
  { icon: '💳', label: 'Credit Cards' },
  { icon: '🚗', label: 'Car Payments' },
]

// Illustrative sample only. Provider names and amounts are made up for the demo and labelled as such on the page.
const SAMPLE = [
  "Hi, I've been a customer for three years and I'd like to review my current plan.",
  'I have seen a comparable offer from another provider at a lower monthly price.',
  "I'd prefer to stay. Can you match or beat it? Otherwise I will need to switch next week.",
].join('\n\n')

const WEEKEND = [
  { day: 'Saturday morning', items: ['List your recurring bills', 'Pick the one that stings most', 'Note what you pay and since when'] },
  { day: 'Saturday afternoon', items: ['Pick the bill type on BillSlash', 'Add provider, amount and tenure', 'Generate your script'] },
  { day: 'Sunday', items: ['Copy the email or call script', 'Send it or make the call', 'Write down the outcome'] },
]

export default function HomePage() {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? SAMPLE.length : 0)

  useEffect(() => {
    if (reduced) { setN(SAMPLE.length); return }
    const id = setInterval(() => setN(c => (c >= SAMPLE.length ? c : c + 2)), 28)
    return () => clearInterval(id)
  }, [reduced])

  const fade = (d = 0) => ({ initial: reduced ? false : { opacity: 0, y: 12 } as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: d } })

  return (
    <div className="bs-page">
      <div className="bs-bg" aria-hidden />
      <nav className="bs-nav">
        <div className="bs-wrap bs-nav-in">
          <Link href="/" className="bs-brand" aria-label="BillSlash home"><Logo size={28} /><span>Bill<b>Slash</b></span></Link>
          <Link href="/negotiate" className="bs-navlink" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', padding: '0 14px', fontWeight: 600, fontSize: 14, color: 'var(--blue)', textDecoration: 'none' }}>Write a script</Link>
        </div>
      </nav>

      <header className="bs-wrap bs-hero">
        <div>
          <motion.p {...fade()} className="bs-kicker">A 20-minute weekend job</motion.p>
          <motion.h1 {...fade(0.05)}>Spend this weekend <span className="bs-hl">slashing one bill</span></motion.h1>
          <motion.p {...fade(0.1)} className="bs-sub">Tell BillSlash which bill and who you pay. It writes the email or call script to ask for a lower rate. You send it.</motion.p>
          <motion.div {...fade(0.15)}>
            <Link href="/negotiate" className="bs-cta btn-primary">Write my script</Link>
            <p className="bs-note">Free to try, no account needed. Results are not guaranteed.</p>
          </motion.div>
        </div>

        <motion.aside {...fade(0.2)} className="bs-card" aria-label="Example script">
          <span className="bs-tag">Example script, made-up details</span>
          <p className="bs-script">{SAMPLE.slice(0, n)}{n < SAMPLE.length && <span className="bs-caret" aria-hidden />}</p>
        </motion.aside>
      </header>

      <section className="bs-wrap bs-sec">
        <h2>Pick a bill</h2>
        <p className="lead">Each one opens the script writer with that bill type chosen.</p>
        <div className="bs-tiles">
          {BILLS.map(b => (
            <Link key={b.label} href={`/negotiate?type=${b.label.toLowerCase()}`} className="bs-tile"><span aria-hidden>{b.icon}</span><span>{b.label}</span></Link>
          ))}
        </div>
      </section>

      <section className="bs-wrap bs-sec">
        <h2>Your weekend plan</h2>
        <p className="lead">Three short blocks, one bill.</p>
        <div className="bs-plan">
          {WEEKEND.map(d => (
            <div key={d.day} className="bs-day"><h3>{d.day}</h3><ol>{d.items.map(i => <li key={i}>{i}</li>)}</ol></div>
          ))}
        </div>
      </section>

      <footer className="bs-foot">
        <div className="bs-wrap">
          <p>BillSlash writes scripts with AI. Outcomes depend on your provider; nothing here is financial advice.</p>
          <p><Link href="/negotiate">Script writer</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></p>
        </div>
      </footer>
    </div>
  )
}
