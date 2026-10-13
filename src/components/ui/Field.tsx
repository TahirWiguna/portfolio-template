import { CircleAlert } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

const CONTROL =
  'w-full rounded-sm border border-field bg-paper px-md text-body text-ink placeholder:text-muted transition-[border-color] duration-(--dur-short) ease-out hover:border-muted focus-visible:border-accent aria-invalid:border-danger'

type ShellProps = {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function FieldShell({ id, label, error, children }: ShellProps) {
  return (
    <div className="grid gap-xs">
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-2xs text-[0.875rem] text-danger">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  )
}

type FieldBase = {
  id: string
  label: string
  error?: string
}

const describedBy = (id: string, error?: string) => (error ? `${id}-error` : undefined)

export function TextField({ id, label, error, ...input }: FieldBase & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={`${CONTROL} h-12`}
        {...input}
      />
    </FieldShell>
  )
}

export function TextAreaField({
  id,
  label,
  error,
  ...textarea
}: FieldBase & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error)}
        className={`${CONTROL} min-h-36 resize-y py-sm leading-relaxed`}
        {...textarea}
      />
    </FieldShell>
  )
}
