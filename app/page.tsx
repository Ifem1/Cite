'use client'

import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Scale, Zap, Shield, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const DEMO_CLAIMS = [
  {
    title: 'GenLayer Studio provides a local environment for testing Intelligent Contracts',
    type: 'technical_capability',
    verdict: 'proven',
    evidence: 3,
  },
  {
    title: 'A GitHub repository contains a deployed StudioNet contract address',
    type: 'contribution_proof',
    verdict: 'mostly_supported',
    evidence: 2,
  },
  {
    title: 'A dApp has a working frontend but no on-chain settlement',
    type: 'incident_claim',
    verdict: 'weakly_supported',
    evidence: 1,
  },
]

const VERDICT_COLORS: Record<string, string> = {
  proven: 'var(--source-green)',
  mostly_supported: 'var(--source-green)',
  weakly_supported: 'var(--amber-doubt)',
  contradicted: 'var(--contradiction-red)',
}

// Floating particle dot
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <div
      className="absolute w-1 h-1 rounded-full bg-[var(--proof-blue)] animate-pulse pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: 0.25,
        animationDelay: `${delay}s`,
        animationDuration: `${2.5 + delay}s`,
        boxShadow: '0 0 6px 2px var(--proof-blue)',
      }}
    />
  )
}

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37 + 11) % 97,
  y: (i * 53 + 7) % 93,
  delay: (i * 0.37) % 3,
}))

// Card with mouse-tracked glow
function GlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, opacity: 0 }))}
      className={`relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--proof-blue)]/40 hover:shadow-[0_0_32px_-8px_var(--proof-blue)] ${className}`}
    >
      {/* radial glow follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(240px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.10) 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  )
}

// Demo claim card with hover glow + verdict dot pulse
function DemoClaimCard({ claim }: { claim: (typeof DEMO_CLAIMS)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    })
  }

  const color = VERDICT_COLORS[claim.verdict] ?? 'var(--paper-muted)'

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, opacity: 0 }))}
      className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-4 space-y-2 transition-[border-color,box-shadow] duration-300 hover:border-[var(--proof-blue)]/30 cursor-default group"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(180px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.08) 0%, transparent 70%)`,
        }}
      />
      <p className="text-xs text-[var(--paper)] leading-snug relative z-10">{claim.title}</p>
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10px] font-mono text-[var(--paper-muted)]">
          {claim.evidence} evidence item{claim.evidence !== 1 ? 's' : ''} · demo
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-mono" style={{ color }}>
          <span
            className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: color, boxShadow: `0 0 6px 2px ${color}` }}
          />
          {claim.verdict.replace(/_/g, ' ')}
        </span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {mounted && PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--proof-blue)]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="font-mono text-xs border-[var(--line)] text-[var(--paper-muted)] gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--source-green)] animate-pulse" />
              StudioNet · GenLayer
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-[var(--paper)] leading-none tracking-tight">
              Claims are cheap.
              <br />
              <span className="text-[var(--proof-blue)]">Evidence is expensive.</span>
            </h1>
            <p className="text-lg text-[var(--paper-muted)] max-w-xl mx-auto leading-relaxed">
              Cite lets GenLayer validators judge whether a public source actually proves what people say it proves — on-chain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/claims/new">
              <Button className="bg-[var(--proof-blue)] hover:bg-blue-500 text-white gap-2 h-11 px-6 shadow-[0_0_24px_-4px_var(--proof-blue)] hover:shadow-[0_0_36px_-4px_var(--proof-blue)] transition-shadow">
                Create Claim
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/claims">
              <Button
                variant="outline"
                className="border-[var(--line)] text-[var(--paper)] hover:bg-[var(--glass)] h-11 px-6"
              >
                Explore Claims
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 border-t border-[var(--line)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <p className="text-xs font-mono text-[var(--paper-muted)] uppercase tracking-widest">The Primitive</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--paper)]">A link is not proof.</h2>
            <p className="text-[var(--paper-muted)] max-w-lg mx-auto">
              Anyone can paste a URL. Cite forces the source to be judged against the exact claim by independent GenLayer validators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Scale className="w-5 h-5 text-[var(--proof-blue)]" />,
                title: 'State the Claim',
                desc: 'Define what you claim happened — with a specific subject, evidence standard, and deadline.',
              },
              {
                step: '02',
                icon: <GitBranch className="w-5 h-5 text-[var(--violet-consensus)]" />,
                title: 'Submit Sources',
                desc: 'Anyone submits public URLs — docs, repos, explorer links, announcements — along with their direction.',
              },
              {
                step: '03',
                icon: <Zap className="w-5 h-5 text-[var(--source-green)]" />,
                title: 'GenLayer Judges',
                desc: 'Validators independently inspect each source and reach consensus. The verdict is stored on-chain.',
              },
            ].map(({ step, icon, title, desc }) => (
              <GlowCard key={step} className="p-6 space-y-3 relative">
                <span className="absolute top-4 right-4 text-xs font-mono text-[var(--paper-muted)] opacity-40">
                  {step}
                </span>
                <div className="w-9 h-9 rounded-lg bg-[var(--glass)] border border-[var(--line)] flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="text-sm font-medium text-[var(--paper)]">{title}</h3>
                <p className="text-xs text-[var(--paper-muted)] leading-relaxed">{desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why sources aren't proof */}
      <section className="py-24 px-6 border-t border-[var(--line)] bg-[var(--panel)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-xs font-mono text-[var(--paper-muted)] uppercase tracking-widest">Why This Matters</p>
              <h2 className="font-display text-3xl text-[var(--paper)]">Sources fail claims in many ways.</h2>
              <ul className="space-y-2 text-sm text-[var(--paper-muted)]">
                {[
                  'The URL is from the wrong page',
                  'The source is three years old',
                  'The page is marketing copy, not proof',
                  'The source supports a weaker version of the claim',
                  'The source directly contradicts the claim',
                  'The URL is a screenshot with no provenance',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 group cursor-default">
                    <span className="text-[var(--contradiction-red)] shrink-0 group-hover:drop-shadow-[0_0_6px_var(--contradiction-red)] transition-all">×</span>
                    <span className="group-hover:text-[var(--paper)] transition-colors duration-200">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[var(--paper-muted)]">
                Cite&apos;s GenLayer validators check all of this — automatically, independently, on-chain.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-mono text-[var(--paper-muted)] mb-4">Example Claim Rooms</p>
              {DEMO_CLAIMS.map((claim) => (
                <DemoClaimCard key={claim.title} claim={claim} />
              ))}
              <p className="text-[10px] font-mono text-[var(--paper-muted)] text-center">
                Demo fixtures — not on-chain until you create them
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GenLayer section */}
      <section className="py-24 px-6 border-t border-[var(--line)]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--violet-consensus)]/10 border border-[var(--violet-consensus)]/20 flex items-center justify-center hover:shadow-[0_0_24px_-4px_var(--violet-consensus)] transition-shadow duration-300">
            <Shield className="w-5 h-5 text-[var(--violet-consensus)]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--paper)]">Powered by GenLayer</h2>
          <p className="text-[var(--paper-muted)] leading-relaxed">
            A normal smart contract can check whether someone uploaded a URL. It cannot decide whether that URL proves the claim. GenLayer&apos;s Intelligent Contracts run nondeterministic consensus — multiple validators independently inspect the sources and agree on a verdict before it is stored on-chain.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/claims/new">
              <Button className="bg-[var(--proof-blue)] hover:bg-blue-500 text-white gap-2 h-10 px-5 shadow-[0_0_20px_-4px_var(--proof-blue)] hover:shadow-[0_0_32px_-4px_var(--proof-blue)] transition-shadow">
                Create Claim <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/claims">
              <Button
                variant="outline"
                className="border-[var(--line)] text-[var(--paper)] hover:bg-[var(--glass)] h-10 px-5"
              >
                Browse Evidence Court
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
