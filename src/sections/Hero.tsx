import { ArrowDown, ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { lazy, Suspense } from 'react'
import Magnet from '@/components/bits/Magnet'
import SplitFlapText from '@/components/bits/SplitFlapText'
import { LiveField } from '@/components/LiveField'
import { ButtonLink } from '@/components/ui/Button'
import { hero, profile } from '@/content'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { useLocalTime } from '@/hooks/useLocalTime'
import { usePalette } from '@/hooks/usePalette'

const GridScan = lazy(() => import('@/components/bits/GridScan'))
const TechText = lazy(() => import('@/components/bits/TechText'))

const NAME = 'TAHIR WIGUNA'

function Readout() {
  const time = useLocalTime(profile.timeZone)
  const rows = [
    ['ID', 'tahir.wiguna'],
    ['Role', profile.role],
    ['Loc', `${profile.city} · ${time}`],
  ]

  return (
    <dl className="label grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-sm gap-y-2xs text-muted">
      {rows.map(([term, detail]) => (
        <div key={term} className="contents">
          <dt>{term}</dt>
          <dd className="text-ink-2">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Hero() {
  const calm = useReducedMotion() ?? false
  const finePointer = useFinePointer()
  const palette = usePalette()

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[calc(var(--nav-height)+var(--space-2xl))] pb-xl"
    >
      <LiveField>
        <GridScan
          linesColor={palette.rule}
          scanColor={palette.accent}
          cells={10}
          depth={3}
          lineThickness={1}
          glow={0.5}
          reflection={0.2}
          scanDuration={3.2}
          scanDelay={2.4}
          clickEffect="ping"
          dpr={1.5}
          className="absolute inset-0"
        />
      </LiveField>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-b from-paper/0 to-paper" />

      <h1 id="hero-title" className="sr-only">
        {profile.name}, {profile.role.toLowerCase()}
      </h1>

      <div className="page-frame pass-through flex flex-1 flex-col gap-xl">
        <div className="flex flex-wrap items-start justify-between gap-lg">
          <Readout />
          <p className="label glass inline-flex items-center gap-xs rounded-pill px-md py-xs text-ink-2">
            <span aria-hidden="true" className="size-1.5 rounded-pill bg-accent" />
            {profile.availability}
          </p>
        </div>

        <div aria-hidden="true" data-interactive className="my-auto h-[clamp(7rem,22vw,20rem)] w-full">
          <Suspense
            fallback={
              <p className="title flex h-full items-center justify-center text-[clamp(3rem,13vw,12rem)] text-ink">{NAME}</p>
            }
          >
            <TechText
              text={NAME}
              fontFamily='"Hubot Sans Variable", sans-serif'
              fontWeight={900}
              fontSize={420}
              letterSpacing={-0.01}
              color={palette.ink}
              accentColor={palette.accent}
              reach={240}
              reveal="area"
              specks={0}
              labels={false}
              selection={false}
              draggable={false}
              sweep={!calm}
              className="h-full w-full"
            />
          </Suspense>
        </div>

        <div className="grid gap-lg lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-muted">I build</p>
            <div className="mt-sm">
              {calm ? (
                <p className="label text-lead text-accent">{hero.flaps.join(' · ')}</p>
              ) : (
                <SplitFlapText
                  words={[...hero.flaps]}
                  padTo={19}
                  fontSize="clamp(0.95rem, 0.6rem + 1.4vw, 1.6rem)"
                  tileColor={palette.paper2}
                  textColor={palette.accent}
                  tileRadius={4}
                  gap={3}
                  cycleDelay={2800}
                  loop
                />
              )}
            </div>
            <p className="mt-lg max-w-[46ch] text-lead leading-snug text-ink-2">{hero.statement}</p>
          </div>

          <div className="flex flex-wrap items-center gap-sm lg:col-span-5 lg:justify-end">
            <Magnet padding={80} magnetStrength={4} maxOffset={12} disabled={!finePointer}>
              <ButtonLink href="#contact" variant="primary" size="lg">
                Start a conversation
                <ArrowRight aria-hidden="true" className="-mr-3xs size-4" strokeWidth={2} />
              </ButtonLink>
            </Magnet>
            <ButtonLink href="#work" variant="ghost" size="lg">
              See the work
              <ArrowDown aria-hidden="true" className="-mr-3xs size-4" strokeWidth={2} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
