import { useReducedMotion } from 'motion/react'
import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

type Props = {
  children: ReactNode
  className?: string
}

type ConnectionAware = Navigator & { connection?: { saveData?: boolean } }

const saveData = () => Boolean((navigator as ConnectionAware).connection?.saveData)

export function LiveField({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const calm = useReducedMotion() ?? false
  const [near, setNear] = useState(false)
  const enabled = !calm && !saveData()

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: '25% 0px', // mount just before entry and unmount after exit so only one or two GPU fields run at once
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [enabled])

  return (
    <div ref={ref} aria-hidden="true" className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      <div className="field-fallback absolute inset-0" />
      {enabled && near && (
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <div className="absolute inset-0 animate-rise-in [animation-duration:1.2s]">{children}</div>
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
