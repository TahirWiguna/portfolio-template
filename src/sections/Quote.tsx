import { lazy } from 'react'
import FadeContent from '@/components/bits/FadeContent'
import { LiveField } from '@/components/LiveField'
import { quote } from '@/content'
import { usePalette } from '@/hooks/usePalette'

const Scanner = lazy(() => import('@/components/bits/Scanner'))

export function Quote() {
  const palette = usePalette()

  return (
    <section aria-label="Kind words" className="relative isolate overflow-hidden py-4xl">
      <LiveField className="fade-edges">
        <Scanner
          color1={palette.accent}
          color2={palette.glacier}
          color3={palette.wash}
          opacity={0.45}
          speed={0.3}
          sweepSpeed={0.14}
          vignette={0.7}
          brightness={0.85}
          grain={false}
          mouseInteraction
          className="absolute inset-0"
        />
      </LiveField>

      <div className="page-frame pass-through">
        <FadeContent blur duration={1100} threshold={0.25}>
          <figure className="mx-auto max-w-[62rem] text-center">
            <p className="label text-accent">Incoming · reference</p>
            <blockquote className="mt-lg font-display text-heading leading-[1.12] font-[420] tracking-[-0.01em] text-ink [font-stretch:96%]">
              <p>“{quote.text}”</p>
            </blockquote>
            <figcaption className="label mt-xl text-muted">
              <span className="text-ink-2">{quote.author}</span> · {quote.title}
            </figcaption>
          </figure>
        </FadeContent>
      </div>
    </section>
  )
}
