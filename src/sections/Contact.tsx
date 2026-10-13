import { ArrowUpRight, CircleAlert, LoaderCircle } from 'lucide-react'
import { lazy, useRef, useState, type FormEvent } from 'react'
import Magnet from '@/components/bits/Magnet'
import { LiveField } from '@/components/LiveField'
import { Button } from '@/components/ui/Button'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { TextAreaField, TextField } from '@/components/ui/Field'
import { contact, profile } from '@/content'
import { useFinePointer } from '@/hooks/useMediaQuery'
import { usePalette } from '@/hooks/usePalette'
import { sendMessage, type ContactMessage } from '@/lib/sendMessage'

const MagicRings = lazy(() => import('@/components/bits/MagicRings'))

type FieldName = keyof ContactMessage
type Errors = Partial<Record<FieldName, string>>
type Status = 'idle' | 'sending' | 'sent' | 'failed'

const EMPTY: ContactMessage = { name: '', email: '', message: '' }
const FIELD_ORDER: FieldName[] = ['name', 'email', 'message']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactMessage): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Add your name so I know who to reply to.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter an email like name@company.com.'
  if (values.message.trim().length < 10) errors.message = 'A sentence or two about the role is plenty.'
  return errors
}

function ContactForm() {
  const [values, setValues] = useState<ContactMessage>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const errors = validate(values)
  const visibleError = (field: FieldName) => (touched[field] ? errors[field] : undefined)

  const update = (field: FieldName) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))
  const markTouched = (field: FieldName) => () => setTouched((current) => ({ ...current, [field]: true }))

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched({ name: true, email: true, message: true })

    const firstInvalid = FIELD_ORDER.find((field) => errors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      await sendMessage(values)
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  const reset = () => {
    setValues(EMPTY)
    setTouched({})
    setStatus('idle')
  }

  if (status === 'sent') {
    return (
      <div role="status" className="glass grid gap-md rounded-[calc(var(--radius-sm)+var(--space-lg))] p-lg md:p-xl">
        <p className="text-lead text-ink">Thanks, {values.name.trim().split(' ')[0]}.</p>
        <p className="text-ink-2">Your message is in. I’ll reply within two working days.</p>
        <Button variant="ghost" size="sm" onClick={reset} className="w-fit">
          Send another
        </Button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={submit}
      aria-labelledby="contact-title"
      className="glass grid gap-lg rounded-[calc(var(--radius-sm)+var(--space-lg))] p-lg md:p-xl"
    >
      <div className="grid gap-lg md:grid-cols-2">
        <TextField
          id="contact-name"
          label="Name"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          onBlur={markTouched('name')}
          error={visibleError('name')}
        />
        <TextField
          id="contact-email"
          label="Work email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          value={values.email}
          onChange={update('email')}
          onBlur={markTouched('email')}
          error={visibleError('email')}
        />
      </div>
      <TextAreaField
        id="contact-message"
        label="The role, in a few lines"
        rows={5}
        value={values.message}
        onChange={update('message')}
        onBlur={markTouched('message')}
        error={visibleError('message')}
      />

      {status === 'failed' && (
        <p role="alert" className="flex items-start gap-xs text-meta text-danger">
          <CircleAlert aria-hidden="true" className="mt-3xs size-4 shrink-0" strokeWidth={2} />
          Couldn’t send that. Check your connection and try again, or email me directly.
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-md">
        <p className="meta text-muted">No newsletter, no tracking. Just a reply.</p>
        <Button type="submit" variant="primary" size="lg" disabled={sending} aria-busy={sending} className="w-full sm:w-auto">
          {sending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" strokeWidth={2} />}
          {sending ? 'Sending…' : status === 'failed' ? 'Try again' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}

export function Contact() {
  const finePointer = useFinePointer()
  const palette = usePalette()

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden pt-4xl pb-3xl">
      <LiveField className="fade-edges">
        <MagicRings
          color={palette.accent}
          colorTwo={palette.glacier}
          ringCount={5}
          speed={0.55}
          lineThickness={1.4}
          glow={0.8}
          baseRadius={0.3}
          radiusStep={0.09}
          opacity={0.6}
          followMouse
          mouseInfluence={0.12}
          clickBurst={false}
          maxDevicePixelRatio={1.5}
          className="absolute inset-0"
        />
      </LiveField>

      <div className="page-frame pass-through flex flex-col items-center text-center">
        <p className="label text-accent">Uplink open</p>
        <h2 id="contact-title" className="title mt-md max-w-[14ch]">
          {contact.heading}
        </h2>
        <p className="mt-lg max-w-[44ch] text-lead leading-snug text-ink-2">{contact.lead}</p>

        <div className="mt-xl flex flex-wrap items-center justify-center gap-md">
            <Magnet padding={60} magnetStrength={6} maxOffset={8} disabled={!finePointer}>
              <a
                href={`mailto:${profile.email}`}
                className="text-body whitespace-nowrap text-ink underline decoration-accent/40 underline-offset-[0.25em] transition-[text-decoration-color] duration-(--dur-short) ease-out hover:decoration-accent sm:text-lead"
              >
                {profile.email}
              </a>
            </Magnet>
            <CopyEmail email={profile.email} />
          </div>

        <div className="mt-2xl w-full max-w-[46rem] text-left">
          <ContactForm />
        </div>

        <ul className="mt-xl flex flex-wrap justify-center gap-x-lg gap-y-xs">
          {[...profile.links, { label: 'Résumé', href: profile.resumeUrl }].map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="label inline-flex h-11 items-center gap-2xs whitespace-nowrap text-ink-2 transition-[color] duration-(--dur-micro) ease-out hover:text-accent"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
                {link.href.startsWith('http') && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
