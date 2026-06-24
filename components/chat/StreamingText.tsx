//components/chat/StreamingText.tsx
'use client'

import { useEffect, useState } from 'react'

interface StreamingTextProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function StreamingText({
  text,
  speed = 10,
  onComplete,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0

    setDisplayedText('')

    const interval = setInterval(() => {
      index++

      setDisplayedText(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return (
    <div className="whitespace-pre-wrap">
      {displayedText}
      <span className="animate-pulse">▍</span>
    </div>
  )
}