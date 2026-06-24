'use client'

import { useState, useEffect, useCallback } from 'react'
import { getPreferences, savePreferences } from '@/lib/storage'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const prefs = getPreferences()
    const savedTheme = prefs.theme || 'light'
    setTheme(savedTheme)
    
    const html = document.documentElement
    if (savedTheme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      savePreferences({ theme: newTheme })
      
      const html = document.documentElement
      if (newTheme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      
      return newTheme
    })
  }, [])

  return { theme, toggleTheme, mounted }
}
