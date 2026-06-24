//components/chat/ChatMessage.tsx
'use client'

import { useState } from 'react'
import { Copy, Heart, Download, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardRenderer } from '@/components/message-cards/CardRenderer'
import { useFavorites } from '@/hooks/useFavorites'
import { generateId } from '@/lib/utils'
import type { Message, Favorite } from '@/types'
import { StreamingText } from './StreamingText'

interface ChatMessageProps {
  message: Message
  onRefine?: () => void
}

export function ChatMessage({ message, onRefine }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const { addFavorite, isFavorited, removeFavorite } = useFavorites()
  const [isSaved, setIsSaved] = useState(() => isFavorited(message.id))

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
  }

  const handleSave = () => {
    if (isSaved) {
      removeFavorite(message.id)
      setIsSaved(false)
    } else {
      const favorite: Favorite = {
        id: generateId(),
        messageId: message.id,
        content: message.content,
        cardData: message.cardData,
        intent: message.intent,
        timestamp: Date.now(),
        tags: message.intent ? [message.intent] : [],
      }
      addFavorite(favorite)
      setIsSaved(true)
    }
  }

  const handleExport = () => {
    const exportData = {
      content: message.content,
      cardData: message.cardData,
      timestamp: new Date(message.timestamp).toISOString(),
      intent: message.intent,
    }
    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vizzy-export-${message.id}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
<div className="flex gap-3 px-4 py-4">      
{!isUser && (
  <div className="flex-shrink-0">
    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
      V
    </div>
  </div>
)}
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Text */}
        <div className="text-black dark:text-white mb-3 leading-8 font-normal text-base whitespace-pre-wrap">  {isUser ? (
    <p>{message.content}</p>
  ) : (
    <StreamingText text={message.content} />
  )}
</div>
        {/* Card if present */}
        {message.cardData && (
          <div className="mb-3">
            <CardRenderer data={message.cardData} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 items-center flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-xs gap-1 text-muted-foreground hover:text-foreground"
          >
            <Copy className="w-3 h-3" />
            Copy
          </Button>

          {!isUser && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefine}
                className="text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <RefreshCw className="w-3 h-3" />
                Refine
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`text-xs gap-1 ${
                  isSaved
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart className={`w-3 h-3 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExport}
                className="text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <Download className="w-3 h-3" />
                Export
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
