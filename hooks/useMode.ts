'use client'

import { useState, useEffect, useCallback } from 'react'
import type { UserMode } from '@/types'
import { getPreferences, savePreferences } from '@/lib/storage'

export function useMode() {
  const [mode, setMode] = useState<UserMode>('home')

  useEffect(() => {
    const prefs = getPreferences()
    setMode(prefs.mode || 'home')
  }, [])

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'home' ? 'business' : 'home'
      savePreferences({ mode: newMode })
      return newMode
    })
  }, [])

  const setModeValue = useCallback((newMode: UserMode) => {
    setMode(newMode)
    savePreferences({ mode: newMode })
  }, [])

  return { mode, toggleMode, setModeValue }
}
