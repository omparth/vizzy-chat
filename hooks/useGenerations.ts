'use client'

import { useState, useEffect } from 'react'
import type { Generation } from '@/types'
import { loadFromStorage, saveToStorage } from '@/lib/storage'

const GENERATIONS_KEY = 'vizzy_generations'
const MAX_GENERATIONS = 100

export function useGenerations() {
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loaded, setLoaded] = useState(false)

  // Load generations from localStorage on mount
  useEffect(() => {
    const stored = loadFromStorage<Generation[]>(GENERATIONS_KEY, [])
    setGenerations(stored)
    setLoaded(true)
  }, [])

  // Add a new generation
  const addGeneration = (generation: Generation) => {
    let updated = [generation, ...generations]
    // Keep only the most recent MAX_GENERATIONS
    if (updated.length > MAX_GENERATIONS) {
      updated = updated.slice(0, MAX_GENERATIONS)
    }
    setGenerations(updated)
    saveToStorage(GENERATIONS_KEY, updated)
  }

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    const updated = generations.map((gen) =>
      gen.id === id ? { ...gen, isFavorite: !gen.isFavorite } : gen
    )
    setGenerations(updated)
    saveToStorage(GENERATIONS_KEY, updated)
  }

  // Delete a generation
  const deleteGeneration = (id: string) => {
    const updated = generations.filter((gen) => gen.id !== id)
    setGenerations(updated)
    saveToStorage(GENERATIONS_KEY, updated)
  }

  // Get favorite generations
  const getFavorites = () => {
    return generations.filter((gen) => gen.isFavorite)
  }

  // Get generations by intent
  const getByIntent = (intent: string) => {
    return generations.filter((gen) => gen.intent === intent)
  }

  // Get generations by mode
  const getByMode = (mode: string) => {
    return generations.filter((gen) => gen.mode === mode)
  }

  // Get recent generations (last N items)
  const getRecent = (limit: number = 10) => {
    return generations.slice(0, limit)
  }

  // Search generations
  const search = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return generations.filter(
      (gen) =>
        gen.prompt.toLowerCase().includes(lowerQuery) ||
        gen.response.toLowerCase().includes(lowerQuery)
    )
  }

  // Clear all generations
  const clearAll = () => {
    setGenerations([])
    saveToStorage(GENERATIONS_KEY, [])
  }

  // Export generations as JSON
  const exportGenerations = () => {
    const dataStr = JSON.stringify(generations, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `vizzy-generations-${Date.now()}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return {
    generations,
    loaded,
    addGeneration,
    toggleFavorite,
    deleteGeneration,
    getFavorites,
    getByIntent,
    getByMode,
    getRecent,
    search,
    clearAll,
    exportGenerations,
  }
}
