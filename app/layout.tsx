import type { Metadata } from 'next'
import { Instrument_Serif, Geist, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { AppShell } from '@/components/layout/app-shell'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = {
  title: 'Cite — Evidence Court',
  description:
    'A GenLayer-powered decentralized evidence court. Create claims, submit public sources, and let GenLayer consensus judge whether the evidence actually proves the claim.',
  keywords: ['GenLayer', 'evidence', 'claim', 'fact-check', 'on-chain', 'consensus'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${geist.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-screen bg-[var(--ink)] text-[var(--paper)] antialiased">
        <AppShell>{children}</AppShell>
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  )
}
