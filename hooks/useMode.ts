'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserMode } from '@/types'
import { getPreferences, savePreferences } from '@/lib/storage'

export function useMode() {
  const [mode, setMode] = useState<UserMode>('home')

  // Load saved mode
  useEffect(() => {
    const prefs = getPreferences()
    setMode(prefs.mode || 'home')
  }, [])

  // Toggle mode
  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'home' ? 'business' : 'home'
      savePreferences({ mode: newMode })
      return newMode
    })
  }, [])

  // Set specific mode
  const setModeValue = useCallback((newMode: UserMode) => {
    setMode(newMode)
    savePreferences({ mode: newMode })
  }, [])

  return { mode, toggleMode, setModeValue }
}
