'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Conversation, Message } from '@/types'
import { generateId } from '@/lib/utils'
import {
  saveConversation,
  getConversations,
  deleteConversation as removeConversation
} from '@/lib/storage'


export function useChat(initialConversationId?: string) {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const saved = getConversations()
    setConversations(saved)

    if (initialConversationId) {
      const found = saved.find((c) => c.id === initialConversationId)
      if (found) {
        setCurrentConversation(found)
      } else if (saved.length > 0) {
        setCurrentConversation(saved[0])
      }
    } else if (saved.length > 0) {
      setCurrentConversation(saved[0])
    }
  }, [initialConversationId])

  const createConversation = useCallback((title: string, mode: 'home' | 'business') => {
    const conversation: Conversation = {
      id: generateId(),
      title,
      mode,
      messages: [],
      created: Date.now(),
      updated: Date.now(),
    }
    saveConversation(conversation)
    setConversations((prev) => [conversation, ...prev])
    setCurrentConversation(conversation)
    return conversation
  }, [])

  const addMessage = useCallback(
    async (
      content: string,
      role: 'user' | 'assistant' = 'user',
      cardData?: any
    ) => {
      if (!currentConversation) return

      const message: Message = {
        id: generateId(),
        role,
        content,
        timestamp: Date.now(),
        cardData,
      }

      const updated = {
        ...currentConversation,
        messages: [...currentConversation.messages, message],
        updated: Date.now(),
      }

      setCurrentConversation(updated)
      saveConversation(updated)
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      )

      return message
    },
    [currentConversation]
  )

  const switchConversation = useCallback((id: string) => {
    const found = conversations.find((c) => c.id === id)
    if (found) {
      setCurrentConversation(found)
    }
  }, [conversations])

  const updateTitle = useCallback(
    (newTitle: string) => {
      if (!currentConversation) return

      const updated = {
        ...currentConversation,
        title: newTitle,
        updated: Date.now(),
      }

      setCurrentConversation(updated)
      saveConversation(updated)
      setConversations((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      )
    },
    [currentConversation]
  )
  const deleteConversation = useCallback(
    (id: string) => {
      removeConversation(id)
  
      const updated = conversations.filter((c) => c.id !== id)
  
      setConversations(updated)
  
      if (currentConversation?.id === id) {
        setCurrentConversation(updated[0] || null)
      }
    },
    [conversations, currentConversation]
  )


  return {
    conversations,
    currentConversation,
    isLoading,
    setIsLoading,
    createConversation,
    addMessage,
    switchConversation,
    updateTitle,
    deleteConversation,
  }
}
