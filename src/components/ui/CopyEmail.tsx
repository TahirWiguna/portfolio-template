import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Button } from './Button'

type Status = 'idle' | 'copied' | 'failed'

const ICON_MOTION = {
  initial: { opacity: 0, scale: 0.25, filter: 'blur(4px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.25, filter: 'blur(4px)' },
  transition: { type: 'spring', duration: 0.3, bounce: 0 },
} as const

const LABELS: Record<Status, string> = {
  idle: 'Copy email',
  copied: 'Copied',
  failed: 'Copy failed',
}

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.append(field)
  field.select()
  const copied = document.execCommand('copy') // insecure contexts have no async clipboard API
  field.remove()
  if (!copied) throw new Error('copy failed')
}

export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const id = window.setTimeout(() => setStatus('idle'), 2000)
    return () => window.clearTimeout(id)
  }, [status])

  const copy = async () => {
    try {
      await writeClipboard(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={copy} className="min-w-[8.5rem]">
      <span aria-hidden="true" className="relative size-4">
        <AnimatePresence initial={false}>
          <motion.span key={status === 'copied' ? 'check' : 'copy'} {...ICON_MOTION} className="absolute inset-0">
            {status === 'copied' ? (
              <Check className="size-4 text-accent" strokeWidth={2} />
            ) : (
              <Copy className="size-4" strokeWidth={2} />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{LABELS[status]}</span>
    </Button>
  )
}
