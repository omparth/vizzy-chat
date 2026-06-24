'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { MessageSquare, ArrowRight } from 'lucide-react'
import type { Message } from '@/types'
import { HOME_STARTER_PROMPTS } from '@/data/home-datasets'
import { BUSINESS_STARTER_PROMPTS } from '@/data/business-datasets'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { TypingIndicator } from './TypingIndicator'

interface ChatAreaProps {
  messages: Message[]
  isLoading: boolean
  mode: 'home' | 'business'
  onSubmitMessage: (message: string) => void
  onRefineMessage?: (messageId: string) => void
}

export function ChatArea({
  messages,
  isLoading,
  mode,
  onSubmitMessage,
  onRefineMessage,
}: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const starterPrompts = mode === 'home' ? HOME_STARTER_PROMPTS : BUSINESS_STARTER_PROMPTS

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
        if (viewport) {
          viewport.scrollTo({
            top: viewport.scrollHeight,
            behavior: messages.length <= 1 ? 'auto' : 'smooth',
          })
        }
      }
    }

    scrollToBottom()
    const timeoutId = setTimeout(scrollToBottom, 60)
    return () => clearTimeout(timeoutId)
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full w-full min-h-0 bg-white dark:bg-[#121215] text-zinc-800 dark:text-zinc-200 transition-colors duration-300">
      
      <div className="flex-1 min-h-0 relative w-full">
        <ScrollArea className="h-full w-full absolute inset-0" ref={scrollRef}>
          <div className="w-full max-w-[760px] mx-auto px-4 md:px-6 pb-24 pt-4">
            <AnimatePresence mode="wait">
              {messages.length === 0 && !isLoading ? (
                <motion.div 
                  key="empty-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[70vh] flex flex-col items-center justify-center py-12 text-center"
                >
                 

                  <div className="mb-8">
                  <div className="space-y-3">
  <p className="text-sm font-medium text-indigo-500">
    Welcome to Vizzy
  </p>

  <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 via-indigo-950 to-zinc-900 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
    Where creativity begins.
  </h1>
</div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto font-medium leading-relaxed">
                      {mode === 'home' 
                        ? 'Bring your wild ideas to life. Generate stunning visual stories, unique scripts, and imaginative experiences.' 
                        : 'Scale your vision with tactical precision. Craft powerful campaigns, strategies, and elegant brand copies.'}
                    </p>
                  </div>

                  <div className="w-full max-w-2xl mt-4">
                    <div className="flex items-center gap-2 justify-center mb-4">
                      <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">Suggested Prompts</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {starterPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.04, duration: 0.25 }}
                          whileHover={{ scale: 1.012, y: -1 }}
                          whileTap={{ scale: 0.995 }}
                          onClick={() => onSubmitMessage(prompt)}
                          className="group flex flex-col justify-between p-4 bg-zinc-50 dark:bg-[#17171c] hover:bg-zinc-100/70 dark:hover:bg-[#1c1c24] border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700/80 rounded-2xl min-h-[90px] transition-all duration-200 text-left shadow-sm relative overflow-hidden"
                        >
                          <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 line-clamp-2 pr-4 leading-relaxed group-hover:text-zinc-900 dark:group-hover:text-white">
                            {prompt}
                          </p>
                          <div className="w-full flex justify-end items-center pt-2 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                            <ArrowRight className="w-3.5 h-3.5 text-indigo-500 dark:text-purple-400" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="chat-history"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-px"
                >
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onRefine={() => onRefineMessage?.(message.id)}
                    />
                  ))}
                  
                  {isLoading && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="w-full py-6"
  >
    <TypingIndicator />
  </motion.div>
)}                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </div>

      <div className="w-full max-w-[760px] mx-auto px-4 md:px-6 pb-4 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-[#121215] dark:via-[#121215]/95 dark:to-transparent pt-4 relative z-20">
        <ChatInput onSubmit={onSubmitMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
