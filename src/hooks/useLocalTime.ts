import { useEffect, useState } from 'react'

export function useLocalTime(timeZone: string) {
  const [formatter] = useState(
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }),
  )
  const [time, setTime] = useState(() => formatter.format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatter.format(new Date())), 15_000)
    return () => window.clearInterval(id)
  }, [formatter])

  return time
}
