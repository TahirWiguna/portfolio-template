import { useId, type JSX } from 'react'
import type { DiagramKind } from '@/content'

const LABEL = 'fill-muted font-mono'
const NODE = 'fill-paper-2 stroke-rule'

function DotGrid({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className="fill-paper-4" />
        </pattern>
      </defs>
      <rect width="640" height="720" fill={`url(#${id})`} />
    </>
  )
}

function Stream() {
  const producers = ['orders', 'drivers', 'routes', 'billing']
  const consumers = ['route-planner', 'eta', 'notify', 'audit']
  const rowY = (index: number) => 176 + index * 120
  const lanes = [260, 304, 348]

  return (
    <g>
      <text x="236" y="110" fontSize="13" className={LABEL}>topic: dispatch.v2</text>
      <rect x="236" y="128" width="168" height="472" rx="16" className={NODE} strokeWidth="1.5" />
      {lanes.map((x, lane) => (
        <g key={x}>
          <text x={x + 6} y="156" fontSize="12" className={LABEL}>p{lane}</text>
          {Array.from({ length: 9 }, (_, slot) => (
            <rect
              key={slot}
              x={x}
              y={176 + slot * 44}
              width="32"
              height="30"
              rx="6"
              className={slot === 8 ? 'fill-glacier' : 'fill-paper-4'}
              opacity={slot === 8 ? 0.9 : 0.35 + slot * 0.06}
            />
          ))}
        </g>
      ))}
      {producers.map((name, index) => (
        <g key={name}>
          <line x1="164" y1={rowY(index)} x2="236" y2={rowY(index)} className="stroke-rule" strokeWidth="1.5" />
          <rect x="40" y={rowY(index) - 26} width="124" height="52" rx="12" className={NODE} strokeWidth="1.5" />
          <text x="58" y={rowY(index) + 5} fontSize="14" className="fill-ink-2 font-mono">{name}</text>
        </g>
      ))}
      {consumers.map((name, index) => (
        <g key={name}>
          <line x1="404" y1={rowY(index)} x2="472" y2={rowY(index)} className="stroke-rule" strokeWidth="1.5" />
          <rect x="472" y={rowY(index) - 26} width="128" height="52" rx="12" className={NODE} strokeWidth="1.5" />
          <text x="488" y={rowY(index) + 5} fontSize="13" className="fill-ink-2 font-mono">{name}</text>
        </g>
      ))}
      <path
        d={`M164 ${rowY(2)} H236 M320 ${rowY(2)} V${rowY(1)} M404 ${rowY(1)} H472`}
        className="stroke-accent"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="320" cy={rowY(2)} r="5" className="fill-accent" />
      <circle cx="320" cy={rowY(1)} r="5" className="fill-accent" />
      <text x="40" y="664" fontSize="13" className={LABEL}>route change, producer to driver ETA</text>
    </g>
  )
}

function Ledger() {
  const rows = ['1,240.00', '86.50', '3,900.00', '412.10', '18.00', '2,075.35', '640.00', '99.99']
  const rowY = (index: number) => 150 + index * 60
  const unmatched = 5

  return (
    <g>
      <text x="40" y="112" fontSize="13" className={LABEL}>bank export</text>
      <text x="376" y="112" fontSize="13" className={LABEL}>ledger</text>
      {rows.map((amount, index) => {
        const y = rowY(index)
        const isException = index === unmatched
        const isLive = index === 2
        return (
          <g key={amount}>
            <rect x="40" y={y} width="224" height="40" rx="10" className={NODE} strokeWidth="1.5" />
            <text x="58" y={y + 25} fontSize="14" className="fill-ink-2 font-mono">EUR {amount}</text>
            <rect
              x="376"
              y={y}
              width="224"
              height="40"
              rx="10"
              className={isException ? 'fill-paper-2 stroke-glacier' : NODE}
              strokeWidth="1.5"
              strokeDasharray={isException ? '6 6' : undefined}
            />
            <text x="394" y={y + 25} fontSize="14" className={isException ? 'fill-glacier font-mono' : 'fill-ink-2 font-mono'}>
              {isException ? 'exception: fx' : `EUR ${amount}`}
            </text>
            {!isException && (
              <path
                d={`M264 ${y + 20} C320 ${y + 20}, 320 ${y + 20}, 376 ${y + 20}`}
                className={isLive ? 'stroke-accent' : 'stroke-rule'}
                strokeWidth={isLive ? 2 : 1.5}
                fill="none"
              />
            )}
          </g>
        )
      })}
      <circle cx="320" cy={rowY(2) + 20} r="5" className="fill-accent" />
      <text x="40" y="664" fontSize="13" className={LABEL}>every line matched or named</text>
    </g>
  )
}

function Trace() {
  const bars = [
    { depth: 0, x: 40, w: 560, label: 'POST /payouts' },
    { depth: 1, x: 40, w: 150, label: 'auth' },
    { depth: 1, x: 200, w: 400, label: 'payout.create' },
    { depth: 2, x: 200, w: 120, label: 'ledger.lock' },
    { depth: 2, x: 330, w: 270, label: 'bank.submit' },
    { depth: 3, x: 330, w: 60, label: 'encode' },
    { depth: 3, x: 400, w: 190, label: 'db.query', slow: true },
    { depth: 4, x: 410, w: 150, label: 'index scan', hint: true },
  ]
  const spark = [560, 552, 556, 540, 548, 520, 530, 476, 500, 512, 534, 528]

  return (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((tick) => (
        <line key={tick} x1={40 + tick * 80} y1="100" x2={40 + tick * 80} y2="108" className="stroke-rule" strokeWidth="1.5" />
      ))}
      <line x1="40" y1="108" x2="600" y2="108" className="stroke-rule" strokeWidth="1.5" />
      {bars.map((bar) => {
        const y = 132 + bar.depth * 48
        const tone = bar.slow ? 'fill-accent-wash stroke-accent' : bar.hint ? 'fill-paper-2 stroke-glacier' : NODE
        const text = bar.slow ? 'fill-accent' : bar.hint ? 'fill-glacier' : 'fill-ink-2'
        return (
          <g key={bar.label}>
            <rect x={bar.x} y={y} width={bar.w} height="36" rx="8" className={tone} strokeWidth="1.5" />
            <text x={bar.x + 12} y={y + 23} fontSize="13" className={`${text} font-mono`}>{bar.label}</text>
          </g>
        )
      })}
      <text x="40" y="440" fontSize="13" className={LABEL}>latency, last hour</text>
      <line x1="40" y1="500" x2="600" y2="500" className="stroke-rule" strokeWidth="1.5" strokeDasharray="4 6" />
      <polyline
        points={spark.map((y, index) => `${40 + index * 50},${y}`).join(' ')}
        className="stroke-glacier"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <circle cx="390" cy="476" r="6" className="fill-accent" />
      <text x="40" y="664" fontSize="13" className={LABEL}>the slow span opens highlighted</text>
    </g>
  )
}

function ComponentGrid() {
  const tile = (column: number, row: number) => ({ x: 40 + column * 192, y: 104 + row * 184 })

  return (
    <g>
      {Array.from({ length: 9 }, (_, index) => {
        const { x, y } = tile(index % 3, Math.floor(index / 3))
        return <rect key={index} x={x} y={y} width="176" height="168" rx="16" className={NODE} strokeWidth="1.5" />
      })}

      <rect x="72" y="172" width="112" height="36" rx="18" className="fill-paper-4" />
      <text x="100" y="195" fontSize="13" className="fill-ink-2 font-mono">Button</text>

      <rect x="276" y="174" width="72" height="32" rx="16" className="fill-accent-wash stroke-accent" strokeWidth="1.5" />
      <circle cx="332" cy="190" r="11" className="fill-accent" />

      <rect x="492" y="168" width="44" height="44" rx="10" className="fill-accent-wash stroke-accent" strokeWidth="1.5" />
      <path d="M502 191 l9 9 l16 -18" className="stroke-accent" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <text x="64" y="340" fontSize="12" className={LABEL}>Email</text>
      <rect x="64" y="352" width="128" height="40" rx="10" className="fill-paper stroke-field" strokeWidth="1.5" />
      <line x1="80" y1="362" x2="80" y2="382" className="stroke-accent" strokeWidth="2" />

      <rect x="262" y="344" width="132" height="44" rx="22" className="fill-none stroke-accent" strokeWidth="2" />
      <rect x="270" y="352" width="116" height="28" rx="14" className="fill-paper-4" />
      <text x="282" y="412" fontSize="12" className={LABEL}>focus-visible</text>

      <line x1="456" y1="368" x2="568" y2="368" className="stroke-rule" strokeWidth="4" strokeLinecap="round" />
      <line x1="456" y1="368" x2="520" y2="368" className="stroke-glacier" strokeWidth="4" strokeLinecap="round" />
      <circle cx="520" cy="368" r="10" className="fill-ink" />

      {[0, 1, 2].map((option) => (
        <g key={option}>
          <circle cx="80" cy={532 + option * 32} r="9" className="fill-none stroke-field" strokeWidth="1.5" />
          {option === 0 && <circle cx="80" cy="532" r="4" className="fill-accent" />}
          <rect x="100" y={527 + option * 32} width="72" height="10" rx="5" className="fill-paper-4" />
        </g>
      ))}

      {[0, 1, 2].map((tab) => (
        <rect key={tab} x={256 + tab * 50} y="540" width="40" height="12" rx="6" className="fill-paper-4" />
      ))}
      <line x1="256" y1="568" x2="296" y2="568" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />

      <circle cx="476" cy="556" r="16" className="fill-accent" />
      <circle cx="516" cy="556" r="16" className="fill-glacier" />
      <circle cx="556" cy="556" r="16" className="fill-ink" />

      <text x="40" y="664" fontSize="13" className={LABEL}>one kit, every client site</text>
    </g>
  )
}

const DIAGRAMS: Record<DiagramKind, () => JSX.Element> = {
  stream: Stream,
  ledger: Ledger,
  trace: Trace,
  grid: ComponentGrid,
}

export function ProjectDiagram({ kind, className = 'block h-auto w-full' }: { kind: DiagramKind; className?: string }) {
  const patternId = `dots-${useId().replace(/[^\w-]/g, '')}` // raw useId output is not a safe url(#id) fragment
  const Diagram = DIAGRAMS[kind]

  return (
    <svg viewBox="0 0 640 720" className={className} aria-hidden="true" focusable="false">
      <rect width="640" height="720" className="fill-paper" />
      <DotGrid id={patternId} />
      <Diagram />
    </svg>
  )
}
