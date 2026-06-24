import type { Conversation, UserPreferences } from '@/types'

const STORAGE_KEYS = {
  CONVERSATIONS: 'vizzy_conversations',
  PREFERENCES: 'vizzy_preferences',
  FAVORITES: 'vizzy_favorites',
  RECENT: 'vizzy_recent',
}

function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json)
  } catch {
    return fallback
  }
}

export function getConversations(): Conversation[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS)
  return safeJsonParse(stored || '', [])
}

export function saveConversation(conversation: Conversation): void {
  if (typeof window === 'undefined') return
  const conversations = getConversations()
  const index = conversations.findIndex((c) => c.id === conversation.id)
  if (index >= 0) {
    conversations[index] = conversation
  } else {
    conversations.push(conversation)
  }
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
}

export function deleteConversation(id: string): void {
  if (typeof window === 'undefined') return
  const conversations = getConversations().filter((c) => c.id !== id)
  localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations))
}

export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return { mode: 'home', theme: 'light' }
  }
  const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
  return safeJsonParse(stored || '', { mode: 'home', theme: 'light' })
}

export function savePreferences(preferences: Partial<UserPreferences>): void {
  if (typeof window === 'undefined') return
  const current = getPreferences()
  const updated = { ...current, ...preferences }
  localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated))
}


export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES)
  return safeJsonParse(stored || '', [])
}

export function addFavorite(messageId: string): void {
  if (typeof window === 'undefined') return
  const favorites = getFavorites()
  if (!favorites.includes(messageId)) {
    favorites.push(messageId)
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
  }
}

export function removeFavorite(messageId: string): void {
  if (typeof window === 'undefined') return
  const favorites = getFavorites().filter((id) => id !== messageId)
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites))
}

export function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  const stored = localStorage.getItem(key)
  if (!stored) return fallback
  return safeJsonParse(stored, fallback)
}

export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearAllStorage(): void {
  if (typeof window === 'undefined') return
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
  })
}
