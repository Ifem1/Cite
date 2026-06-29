'use client'

import { TopCommand } from './top-command'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopCommand />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[var(--line)] py-6 px-6 text-center">
        <p className="text-xs text-[var(--paper-muted)] font-mono">
          Cite Evidence Court · Powered by{' '}
          <a
            href="https://genlayer.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--proof-blue)] hover:underline"
          >
            GenLayer
          </a>{' '}
          · StudioNet
        </p>
      </footer>
    </div>
  )
}
