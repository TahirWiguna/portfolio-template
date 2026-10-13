import { ArrowUp } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import ScrollVelocity from '@/components/bits/ScrollVelocity'
import TextPressure from '@/components/bits/TextPressure'
import { profile, ticker } from '@/content'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { useLocalTime } from '@/hooks/useLocalTime'
import { usePalette } from '@/hooks/usePalette'

const TICKER_LINE = `${ticker.join('  ✦  ')}  ✦  `
const WORDMARK = 'ARI CALDER'

export function Footer() {
  const calm = useReducedMotion() ?? false
  const finePointer = useFinePointer()
  const time = useLocalTime(profile.timeZone)
  const palette = usePalette()

  return (
    <footer className="relative overflow-hidden pt-2xl pb-xl">
      <div className="border-y border-rule py-md">
        {calm ? (
          <p className="page-frame label text-ink-2">{ticker.join(' · ')}</p>
        ) : (
          <ScrollVelocity
            texts={[TICKER_LINE]}
            velocity={36}
            numCopies={6}
            className="pr-lg font-display text-heading leading-none font-[800] tracking-[-0.01em] text-ink uppercase [font-stretch:125%]"
          />
        )}
      </div>

      <div className="page-frame">
        <div aria-hidden="true" data-interactive className="mt-2xl h-[clamp(5rem,15vw,14rem)]">
          {finePointer && !calm ? (
            <TextPressure
              text={WORDMARK}
              fontFamily="Hubot Sans Variable"
              fontUrl=""
              width
              weight
              italic={false}
              textColor={palette.ink}
              minFontSize={40}
            />
          ) : (
            <p className="title flex h-full items-center justify-between text-[clamp(2.5rem,13vw,12rem)] text-ink">
              {WORDMARK}
            </p>
          )}
        </div>

        <div className="label mt-xl flex flex-wrap items-center justify-between gap-x-lg gap-y-sm text-muted">
          <span className="text-ink">
            ari<span className="text-accent">.</span>calder
          </span>
          <span>© 2026 {profile.name}</span>
          <span>
            {profile.city} <time>{time}</time>
          </span>
          <a
            href="#top"
            className="inline-flex h-11 items-center gap-2xs text-ink-2 transition-[color] duration-(--dur-micro) ease-out hover:text-accent"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="size-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  )
}
