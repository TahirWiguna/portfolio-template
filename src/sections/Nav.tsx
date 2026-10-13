import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { profile } from '@/content'
import { useActiveSection } from '@/hooks/useActiveSection'

const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
] as const

const SECTION_IDS = ['work', 'experience', 'about', 'contact'] as const

function Wordmark() {
  return (
    <a
      href="#top"
      aria-label={`${profile.name}, back to top`}
      className="label rounded-pill px-xs text-ink transition-[color] duration-(--dur-micro) ease-out hover:text-accent"
    >
      ari<span className="text-accent">.</span>calder
    </a>
  )
}

export function Nav() {
  const active = useActiveSection(SECTION_IDS)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const close = (returnFocus: boolean) => {
      setOpen(false)
      if (returnFocus) toggleRef.current?.focus()
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true)
    }
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node
      if (!panelRef.current?.contains(target) && !toggleRef.current?.contains(target)) close(false)
    }

    panelRef.current?.querySelector('a')?.focus()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-md z-(--z-sticky) px-(--page-gutter)">
      <nav
        aria-label="Primary"
        className="pointer-events-auto relative mx-auto flex h-(--nav-height) w-full max-w-[35rem] items-center gap-xs rounded-pill bg-paper-2/75 py-2xs pr-2xs pl-sm shadow-(--shadow-pill) backdrop-blur-md backdrop-saturate-150"
      >
        <Wordmark />

        <ul className="ml-auto hidden items-center gap-3xs lg:flex">
          {LINKS.map((link) => {
            const current = active === link.id
            return (
              <li key={link.id} className="relative">
                {current && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-pill bg-paper-4"
                    transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
                  />
                )}
                <a
                  href={`#${link.id}`}
                  aria-current={current ? 'true' : undefined}
                  className={`label relative flex h-10 items-center rounded-pill px-md transition-[color] duration-(--dur-micro) ease-out ${
                    current ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <ButtonLink
          href="#contact"
          variant={active === 'contact' ? 'primary' : 'ghost'}
          size="sm"
          className="ml-auto lg:ml-xs"
          aria-current={active === 'contact' ? 'true' : undefined}
        >
          Contact
        </ButtonLink>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
          className="relative flex size-10 shrink-0 items-center justify-center rounded-pill text-ink transition-[background-color,scale] duration-(--dur-micro) ease-out hover:bg-paper-4 active:scale-[0.96] lg:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X aria-hidden="true" className="size-5" strokeWidth={1.5} /> : <Menu aria-hidden="true" className="size-5" strokeWidth={1.5} />}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              id={menuId}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -6, transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] } }}
              className="raised absolute inset-x-0 top-[calc(100%+var(--space-xs))] rounded-[calc(var(--radius-sm)+var(--space-xs))] p-xs lg:hidden"
            >
              <ul className="grid gap-3xs">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === link.id ? 'true' : undefined}
                      className="flex h-12 items-center rounded-sm px-md text-body text-ink-2 transition-[background-color,color] duration-(--dur-micro) ease-out hover:bg-paper-3 hover:text-ink aria-[current=true]:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={profile.resumeUrl}
                    onClick={() => setOpen(false)}
                    className="flex h-12 items-center rounded-sm px-md text-body text-ink-2 transition-[background-color,color] duration-(--dur-micro) ease-out hover:bg-paper-3 hover:text-ink"
                  >
                    Résumé (PDF)
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
