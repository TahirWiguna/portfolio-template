import { MotionConfig } from 'motion/react'
import Noise from '@/components/bits/Noise'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Experience } from '@/sections/Experience'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Nav } from '@/sections/Nav'
import { Quote } from '@/sections/Quote'
import { Work } from '@/sections/Work'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-md left-md z-(--z-tooltip) -translate-y-[200%] rounded-pill bg-accent px-md py-xs text-meta font-medium text-accent-ink focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Quote />
        <Contact />
      </main>
      <Footer />
      <Noise fixed opacity={0.06} fps={12} blendMode="overlay" zIndex={1} />
    </MotionConfig>
  )
}
