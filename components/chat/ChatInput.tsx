'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mic, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatInputProps {
  onSubmit: (message: string) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({
  onSubmit,
  isLoading,
  placeholder = "Tell me what you'd like to create...",
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px'
    }
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSubmit(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const isFormEmpty = !message.trim()

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div
  className={`w-full flex flex-col bg-zinc-50 dark:bg-[#17171c] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl transition-all duration-200 focus-within:border-zinc-300 dark:focus-within:border-zinc-700/80 focus-within:shadow-sm ${
    isLoading
      ? 'opacity-70 pointer-events-none'
      : ''
  }`}
>        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="w-full px-4 pt-4 pb-2 bg-transparent text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none resize-none text-sm min-h-[44px] leading-relaxed max-h-[200px]"
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-1.5">
          
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              title="Add attachment"
              disabled={isLoading}
              className="w-8 h-8 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </Button>
            
            <Button
              type="button"
              size="icon"
              variant="ghost"
              title="Voice input"
              disabled={isLoading}
              className="w-8 h-8 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/40 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>

          <motion.div
            animate={{ scale: isFormEmpty ? 0.96 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              type="submit"
              size="icon"
              disabled={isFormEmpty || isLoading}
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                isFormEmpty
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed shadow-none'
                  : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-sm'
              }`}
            >
{isLoading ? (
  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
) : (
  <ArrowUp className="w-4 h-4 stroke-[2.5]" />
)}            </Button>
          </motion.div>

        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wide font-medium">
          Vizzy can make mistakes. Consider checking important information.
        </p>
      </div>
    </form>
  )
}
