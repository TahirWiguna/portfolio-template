import { Download } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { lazy } from 'react'
import LogoLoop from '@/components/bits/LogoLoop'
import ScrollReveal from '@/components/bits/ScrollReveal'
import { LiveField } from '@/components/LiveField'
import { about, profile } from '@/content'
import { useLocalTime } from '@/hooks/useLocalTime'
import { useNarrowViewport } from '@/hooks/useMediaQuery'
import { usePalette } from '@/hooks/usePalette'

const Radar = lazy(() => import('@/components/bits/Radar'))

function Scope() {
  const palette = usePalette()

  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <div className="relative isolate aspect-square overflow-hidden rounded-pill bg-paper-2 shadow-(--shadow-raised)">
        <LiveField>
          <Radar
            color={palette.accent}
            backgroundColor={palette.paper2}
            ringCount={4}
            spokeCount={12}
            targets={5}
            clutter={0.25}
            glow={1.1}
            brightness={1.5}
            speed={0.6}
            mouseInteraction
            dpr={1.5}
            className="absolute inset-0"
          />
        </LiveField>
      </div>
      <figcaption className="label mt-md flex justify-between gap-md text-muted">
        <span>
          Scanning <span className="text-accent">· staff & senior roles</span>
        </span>
        <span>38.7°N 9.1°W</span>
      </figcaption>
    </figure>
  )
}

export function About() {
  const calm = useReducedMotion() ?? false
  const narrow = useNarrowViewport()
  const time = useLocalTime(profile.timeZone)
  const readout = [...about.facts.slice(0, 1), { term: 'Local time', detail: `${time} · ${profile.city}` }, ...about.facts.slice(1)]

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-4xl">
      <div className="page-frame grid gap-2xl lg:grid-cols-12 lg:items-center lg:gap-3xl">
        <div className="lg:col-span-5">
          <Scope />
        </div>

        <div className="lg:col-span-7">
          <h2 id="about-title" className="title">
            About
          </h2>
          <ScrollReveal
            disabled={calm || narrow}
            baseOpacity={0.16}
            baseRotation={0}
            blurStrength={3}
            containerClassName="mt-lg"
            textClassName="text-lead leading-[1.45] text-ink"
          >
            {about.statement}
          </ScrollReveal>

          <dl className="mt-xl grid grid-cols-2 gap-px overflow-hidden rounded-md bg-rule">
            {readout.map((entry) => (
              <div key={entry.term} className="bg-paper p-md">
                <dt className="label text-muted">{entry.term}</dt>
                <dd className="mt-2xs text-ink-2">{entry.detail}</dd>
              </div>
            ))}
          </dl>

          <a
            href={profile.resumeUrl}
            className="mt-lg inline-flex h-11 items-center gap-xs text-ink underline decoration-accent/40 underline-offset-4 transition-[text-decoration-color] duration-(--dur-short) ease-out hover:decoration-accent"
          >
            <Download aria-hidden="true" className="size-4 text-accent" strokeWidth={1.5} />
            Download résumé (PDF)
          </a>
        </div>
      </div>

      <div className="mt-3xl">
        <p className="page-frame label text-muted">Toolbox</p>
        <div className="mt-md">
          {calm ? (
            <ul className="page-frame flex flex-wrap gap-xs">
              {about.tools.map((tool) => (
                <li key={tool} className="label rounded-pill bg-paper-3 px-md py-xs text-ink-2">
                  {tool}
                </li>
              ))}
            </ul>
          ) : (
            <LogoLoop
              logos={about.tools.map((tool) => ({
                node: <span className="label rounded-pill bg-paper-2 px-md py-xs text-ink-2">{tool}</span>,
                title: tool,
              }))}
              speed={42}
              gap={14}
              logoHeight={32}
              fadeOut
              fadeOutColor="var(--color-paper)"
              pauseOnHover
              ariaLabel="Toolbox"
            />
          )}
        </div>
      </div>
    </section>
  )
}
