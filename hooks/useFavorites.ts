'use client'

import { useState, useEffect } from 'react'
import type { Favorite } from '@/types'
import { loadFromStorage, saveToStorage } from '@/lib/storage'

const FAVORITES_KEY = 'vizzy_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage<Favorite[]>(FAVORITES_KEY, [])
    setFavorites(stored)
    setLoaded(true)
  }, [])

  // Add a favorite
  const addFavorite = (favorite: Favorite) => {
    const updated = [favorite, ...favorites]
    setFavorites(updated)
    saveToStorage(FAVORITES_KEY, updated)
  }

  // Remove a favorite
  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav.id !== id)
    setFavorites(updated)
    saveToStorage(FAVORITES_KEY, updated)
  }

  // Update favorite title
  const updateFavoriteTitle = (id: string, title: string) => {
    const updated = favorites.map((fav) =>
      fav.id === id ? { ...fav, title } : fav
    )
    setFavorites(updated)
    saveToStorage(FAVORITES_KEY, updated)
  }

  // Add tag to favorite
  const addTag = (id: string, tag: string) => {
    const updated = favorites.map((fav) => {
      if (fav.id === id) {
        const tags = fav.tags || []
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
        return { ...fav, tags }
      }
      return fav
    })
    setFavorites(updated)
    saveToStorage(FAVORITES_KEY, updated)
  }

  // Remove tag from favorite
  const removeTag = (id: string, tag: string) => {
    const updated = favorites.map((fav) => {
      if (fav.id === id) {
        return {
          ...fav,
          tags: (fav.tags || []).filter((t) => t !== tag),
        }
      }
      return fav
    })
    setFavorites(updated)
    saveToStorage(FAVORITES_KEY, updated)
  }

  // Check if message is favorited
  const isFavorited = (messageId: string) => {
    return favorites.some((fav) => fav.messageId === messageId)
  }

  // Get favorites by intent
  const getFavoritesByIntent = (intent: string) => {
    return favorites.filter((fav) => fav.intent === intent)
  }

  // Get favorites by tag
  const getFavoritesByTag = (tag: string) => {
    return favorites.filter((fav) => fav.tags?.includes(tag))
  }

  // Export favorites as JSON
  const exportFavorites = () => {
    const dataStr = JSON.stringify(favorites, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vizzy-favorites-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    favorites,
    loaded,
    addFavorite,
    removeFavorite,
    updateFavoriteTitle,
    addTag,
    removeTag,
    isFavorited,
    getFavoritesByIntent,
    getFavoritesByTag,
    exportFavorites,
  }
}
