'use client'

import { useMemo } from 'react'

type TypingIndicatorProps = {
  mode?: 'home' | 'business'
}

export function TypingIndicator({
  mode = 'home',
}: TypingIndicatorProps) {
  const message = useMemo(() => {
    const homeMessages = [
      '🎨 Creating artwork...',
      '✨ Generating concepts...',
      '🌙 Visualizing ideas...',
      '📖 Building your story...',
      '🖼️ Designing creative visuals...',
      '💡 Crafting inspiration...',
    ]

    const businessMessages = [
      '📦 Creating product visuals...',
      '📢 Building campaign assets...',
      '🎬 Designing storyboard concepts...',
      '🏷️ Generating marketing creatives...',
      '🎨 Creating brand artwork...',
      '🚀 Preparing business content...',
    ]

    const messages =
      mode === 'business'
        ? businessMessages
        : homeMessages

    return messages[Math.floor(Math.random() * messages.length)]
  }, [mode])

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Vizzy is thinking...
      </p>

      <div className="flex gap-2 items-center">
        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" />
        <div
          className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
          style={{ animationDelay: '0.15s' }}
        />
        <div
          className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
          style={{ animationDelay: '0.3s' }}
        />
      </div>

      <p className="text-xs text-zinc-500 animate-pulse">
        {message}
      </p>
    </div>
  )
}