import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'lg'

const BASE =
  'relative inline-flex shrink-0 items-center justify-center gap-xs whitespace-nowrap rounded-pill font-medium select-none transition-[background-color,color,scale] duration-(--dur-micro) ease-out active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-focus',
  ghost: 'bg-paper-3 text-ink shadow-(--shadow-pill) hover:bg-paper-4',
}

const SIZES: Record<Size, string> = {
  sm: "label h-10 px-md after:absolute after:inset-x-0 after:-inset-y-0.5 after:content-['']", // pseudo-element lifts the hit area to 44px on touch
  lg: 'h-12 px-xl text-body',
}

type Shared = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

const classes = (variant: Variant, size: Size, className: string) =>
  `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()

export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  className = '',
  children,
  ...anchor
}: Shared & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes(variant, size, className)} {...anchor}>
      {children}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'lg',
  className = '',
  type = 'button',
  children,
  ...button
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classes(variant, size, className)} {...button}>
      {children}
    </button>
  )
}
