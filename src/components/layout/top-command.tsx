'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Scale, Plus, List, Library, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { connectWallet, getCurrentChainId } from '@/lib/genlayer/client'
import { CHAIN_ID } from '@/lib/genlayer/chains'
import { shortenAddress } from '@/lib/utils/explorer'
import { toast } from 'sonner'

export function TopCommand() {
  const pathname = usePathname()
  const [address, setAddress] = useState<string | null>(null)
  const [wrongNetwork, setWrongNetwork] = useState(false)
  const [connecting, setConnecting] = useState(false)

  // Only listen for wallet events — never auto-connect on mount.
  // The user must click "Connect Wallet" to initiate a connection.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return
    const handler = (accounts: unknown) => {
      const accs = accounts as string[]
      setAddress(accs[0] ?? null)
      if (accs[0]) {
        getCurrentChainId().then((id) => setWrongNetwork(id !== null && id !== CHAIN_ID))
      } else {
        setWrongNetwork(false)
      }
    }
    const chainHandler = (chainId: unknown) => {
      setWrongNetwork(parseInt(chainId as string, 16) !== CHAIN_ID)
    }
    window.ethereum.on('accountsChanged', handler)
    window.ethereum.on('chainChanged', chainHandler)
    return () => {
      window.ethereum?.removeListener('accountsChanged', handler)
      window.ethereum?.removeListener('chainChanged', chainHandler)
    }
  }, [])

  async function handleConnect() {
    setConnecting(true)
    try {
      const addr = await connectWallet()
      setAddress(addr)
      setWrongNetwork(false)
      toast.success('Wallet connected')
    } catch (err: unknown) {
      const error = err as Error
      toast.error(error.message ?? 'Failed to connect wallet')
    } finally {
      setConnecting(false)
    }
  }

  const nav = [
    { href: '/claims', label: 'Claims', icon: List },
    { href: '/sources', label: 'Sources', icon: Library },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--panel)]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Scale className="w-4 h-4 text-[var(--proof-blue)]" />
          <span className="font-display text-lg text-[var(--paper)] tracking-tight">Cite</span>
          <span className="hidden sm:inline text-xs text-[var(--paper-muted)] font-mono border border-[var(--line)] rounded px-1.5 py-0.5">
            Evidence Court
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
                pathname.startsWith(href)
                  ? 'bg-[var(--glass)] text-[var(--paper)]'
                  : 'text-[var(--paper-muted)] hover:text-[var(--paper)] hover:bg-[var(--glass)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {wrongNetwork && (
            <span className="hidden sm:inline text-xs text-[var(--contradiction-red)] font-mono border border-[var(--contradiction-red)]/30 rounded px-2 py-0.5">
              Wrong Network
            </span>
          )}

          {address ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-mono text-[var(--paper-muted)] border border-[var(--line)] rounded px-2 py-1">
                {shortenAddress(address)}
              </span>
              <Link href="/claims/new">
                <Button size="sm" className="bg-[var(--proof-blue)] hover:bg-blue-500 text-white gap-1.5 h-8">
                  <Plus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Create Claim</span>
                </Button>
              </Link>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={handleConnect}
              disabled={connecting}
              className="h-8 border-[var(--line)] text-[var(--paper)] hover:bg-[var(--glass)] gap-1.5"
            >
              {connecting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
