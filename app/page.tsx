'use client'

import { useState, useEffect, useRef } from 'react'
import { Sidebar } from '@/components/sidebar/Sidebar'
import { ChatArea } from '@/components/chat/ChatArea'
import { FavoritesPanel } from '@/components/favorites/FavoritesPanel'
import { useChat } from '@/hooks/useChat'
import { useMode } from '@/hooks/useMode'
import { useTheme } from '@/hooks/useTheme'
import { analyzeIntent } from '@/lib/intent-router'
import { generateMockResponse } from '@/lib/mock-ai'
import type { Message } from '@/types'
import { Menu, X } from 'lucide-react'

export default function Page() {
  const { mounted } = useTheme()
  const { mode, setModeValue } = useMode()
  const chat = useChat()
  
  const [showFavorites, setShowFavorites] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const pendingMessageRef = useRef<string | null>(null)

  const messages = chat.currentConversation?.messages || []

  useEffect(() => {
    if (chat.currentConversation && pendingMessageRef.current) {
      const messageToSend = pendingMessageRef.current
      pendingMessageRef.current = null 
      executeMessageSequence(messageToSend, chat.currentConversation.id)
    }
  }, [chat.currentConversation?.id])

  const executeMessageSequence = async (content: string, conversationId: string) => {
    try {
      chat.setIsLoading(true)

      const intents = messages.filter((m) => m.intent).map((m) => m.intent!)
      const analysis = analyzeIntent(content, mode, intents)

      const userMessage = await chat.addMessage(content, 'user')
      if (!userMessage) return

      const { response, cardData } = await generateMockResponse(
        content,
        analysis.intent,
        mode
      )

      const assistantMessage = await chat.addMessage(
        response, 
        'assistant', 
        cardData
      )
      

    } catch (error) {
      console.error("Failed to process message:", error)
    } finally {
      chat.setIsLoading(false)
    }
  }

  const handleSubmitMessage = async (content: string) => {
    if (!content.trim()) return

    if (!chat.currentConversation) {
      pendingMessageRef.current = content
      const title = content.length > 25 ? `${content.substring(0, 25)}...` : content
      chat.createConversation(title, mode)
      return
    }

    await executeMessageSequence(content, chat.currentConversation.id)
  }

  const handleRefineMessage = (messageId: string) => {
    const currentIndex = messages.findIndex((m) => m.id === messageId)
    
    if (currentIndex > -1) {
      const previousUserMessage = [...messages]
        .slice(0, currentIndex + 1)
        .reverse()
        .find((m) => m.role === 'user')
      
      if (previousUserMessage) {
        handleSubmitMessage(previousUserMessage.content)
      }
    }
  }

  if (!mounted) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-48">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans antialiased">
      <div className="md:hidden absolute top-0 left-0 right-0 h-14 border-b bg-background flex items-center justify-between px-4 z-40">
        <button onClick={() => setMobileSidebarOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
  
        <span className="font-semibold">
          Vizzy
        </span>
      </div>
  
      <div className="hidden md:flex">
        <Sidebar
          conversations={chat.conversations}
          currentId={chat.currentConversation?.id || null}
          mode={mode}
          onNew={() => {
            const title = `New Chat - ${new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}`
            chat.createConversation(title, mode)
          }}
          onSelect={chat.switchConversation}
          onModeChange={setModeValue}
          onDeleteConversation={chat.deleteConversation}
          onOpenFavorites={() => setShowFavorites(true)}
        />
      </div>
  
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
  
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
  
          <div className="relative w-72 h-full bg-white dark:bg-[#17171c]">
  
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 z-50"
            >
              <X className="w-5 h-5" />
            </button>
  
            <Sidebar
              conversations={chat.conversations}
              currentId={chat.currentConversation?.id || null}
              mode={mode}
              onNew={() => {
                chat.createConversation('New Chat', mode)
                setMobileSidebarOpen(false)
              }}
              onSelect={(id) => {
                chat.switchConversation(id)
                setMobileSidebarOpen(false)
              }}
              onModeChange={setModeValue}
              onDeleteConversation={chat.deleteConversation}
              onOpenFavorites={() => {
                setShowFavorites(true)
                setMobileSidebarOpen(false)
              }}
            />
          </div>
        </div>
      )}
  
      <main className="flex-1 flex flex-col relative min-w-0 bg-content-background transition-colors duration-200 pt-14 md:pt-0">
        <ChatArea
          messages={messages}
          isLoading={chat.isLoading}
          mode={mode}
          onSubmitMessage={handleSubmitMessage}
          onRefineMessage={handleRefineMessage}
        />
      </main>

      <FavoritesPanel 
        isOpen={showFavorites} 
        onClose={() => setShowFavorites(false)} 
  

      />
    </div>
  )
}
