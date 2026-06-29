import type { Evidence } from '@/lib/types/cite'
import { hostFromUrl } from '@/lib/utils/explorer'

interface SourceAlignmentMapProps {
  evidenceItems: Array<{ id: string; evidence: Evidence }>
}

const DIRECTION_CONFIG = {
  supports:    { color: 'var(--source-green)',       bg: '#16a34a22', border: '#16a34a44', label: 'Supports',     short: 'S' },
  contradicts: { color: 'var(--contradiction-red)',  bg: '#dc262622', border: '#dc262644', label: 'Contradicts',  short: 'C' },
  contextual:  { color: 'var(--amber-doubt)',        bg: '#d9770622', border: '#d9770644', label: 'Contextual',   short: 'X' },
  uncertain:   { color: 'var(--paper-muted)',        bg: '#6b728022', border: '#6b728044', label: 'Uncertain',    short: '?' },
}

export function SourceAlignmentMap({ evidenceItems }: SourceAlignmentMapProps) {
  if (evidenceItems.length === 0) return null

  const counts = { supports: 0, contradicts: 0, contextual: 0, uncertain: 0 }
  for (const { evidence } of evidenceItems) {
    const dir = evidence.support_direction as keyof typeof counts
    if (dir in counts) counts[dir]++
    else counts.uncertain++
  }
  const total = evidenceItems.length

  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--panel-soft)] p-4 space-y-4">
      <p className="text-xs font-mono text-[var(--paper-muted)] uppercase tracking-widest">Source Alignment</p>

      {/* Summary bar */}
      <div className="space-y-2">
        <div className="flex h-2 rounded-full overflow-hidden gap-px">
          {(Object.entries(counts) as [keyof typeof counts, number][])
            .filter(([, n]) => n > 0)
            .map(([dir, n]) => (
              <div
                key={dir}
                className="h-full rounded-sm"
                style={{
                  width: `${(n / total) * 100}%`,
                  background: DIRECTION_CONFIG[dir].color,
                  opacity: 0.8,
                }}
              />
            ))}
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {(Object.entries(counts) as [keyof typeof counts, number][])
            .filter(([, n]) => n > 0)
            .map(([dir, n]) => (
              <span key={dir} className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: DIRECTION_CONFIG[dir].color }}>
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ background: DIRECTION_CONFIG[dir].color }}
                />
                {n} {DIRECTION_CONFIG[dir].label}
              </span>
            ))}
        </div>
      </div>

      {/* Per-evidence rows */}
      <div className="space-y-1.5">
        {evidenceItems.map(({ id, evidence }) => {
          const cfg = DIRECTION_CONFIG[evidence.support_direction as keyof typeof DIRECTION_CONFIG] ?? DIRECTION_CONFIG.uncertain
          return (
            <div key={id} className="flex items-center gap-2.5 py-1 border-b border-[var(--line)] last:border-0">
              <span
                className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold shrink-0"
                style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
              >
                {cfg.short}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--paper)] truncate font-mono">{hostFromUrl(evidence.source_url)}</p>
                <p className="text-[10px]" style={{ color: cfg.color }}>{cfg.label}</p>
              </div>
              <span className="text-[10px] font-mono text-[var(--paper-muted)] shrink-0">#{id}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
