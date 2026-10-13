import { useReducedMotion } from 'motion/react'
import { lazy } from 'react'
import StrokeText from '@/components/bits/StrokeText'
import { LiveField } from '@/components/LiveField'
import { experience } from '@/content'
import { usePalette } from '@/hooks/usePalette'

const Topography = lazy(() => import('@/components/bits/Topography'))

export function Experience() {
  const calm = useReducedMotion() ?? false
  const palette = usePalette()

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative isolate overflow-hidden py-4xl">
      <LiveField className="fade-edges">
        <Topography
          lowColor={palette.wash}
          midColor={palette.accent}
          highColor={palette.glacier}
          opacity={0.38}
          bands={2.4}
          thickness={0.007}
          speed={0.18}
          morphSpeed={0.04}
          glow={0.35}
          grain={false}
          mouseInteraction
          mouseRadius={0.25}
          mouseStrength={0.3}
          className="absolute inset-0"
        />
      </LiveField>

      <div className="page-frame">
        <h2 id="experience-title" className="max-w-[56rem]">
          {calm ? (
            <span className="title block">Experience</span>
          ) : (
            <StrokeText
              text="EXPERIENCE"
              strokeColor={palette.accent}
              fillColor={palette.ink}
              strokeWidth={1.2}
              drawDuration={1.4}
              stagger={0.04}
              trigger="scroll"
              fontSize={160}
              fontWeight={820}
              letterSpacing={-2}
              style={{ fontFamily: 'var(--font-display)', fontStretch: '125%' }}
            />
          )}
        </h2>
        <p className="label mt-lg text-muted">Route · 2017 → now · four stops</p>

        <ol className="relative mt-2xl grid gap-lg md:grid-cols-2 lg:grid-cols-4">
          <span aria-hidden="true" className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-rule lg:block" />
          {experience.map((job, index) => (
            <li key={job.company} className="relative flex flex-col lg:pt-xl">
              <span
                aria-hidden="true"
                className="absolute top-0 left-lg hidden size-3.5 items-center justify-center rounded-pill border border-accent bg-paper lg:flex"
              >
                {index === 0 && <span className="size-1.5 rounded-pill bg-accent" />}
              </span>
              <div className="glass flex h-full flex-col rounded-lg p-lg">
                <p className="label text-accent">{job.period}</p>
                <h3 className="mt-md font-display text-lead leading-tight font-[650] [font-stretch:108%]">{job.role}</h3>
                <p className="text-ink-2">{job.company}</p>
                <p className="mt-md text-muted">{job.impact}</p>
                <p className="label mt-auto pt-lg text-muted">{job.stack}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
