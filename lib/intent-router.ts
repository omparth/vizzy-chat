import type { Intent, IntentAnalysis, UserMode } from '@/types'

const INTENT_PATTERNS: Record<Intent, { keywords: string[]; confidence: number }> = {
  dream: {
    keywords: ['dream', 'visualize', 'imagine', 'vision', 'aspiration', 'goal', 'future'],
    confidence: 0.9,
  },
  story: {
    keywords: ['story', 'tale', 'narrative', 'chapter', 'scene', 'plot', 'character'],
    confidence: 0.9,
  },
  campaign: {
    keywords: ['campaign', 'marketing', 'promote', 'advertisement', 'launch', 'strategy'],
    confidence: 0.9,
  },
  poster: {
    keywords: ['poster', 'design', 'visual', 'layout', 'banner', 'artwork', 'flyer'],
    confidence: 0.85,
  },
  moodboard: {
    keywords: ['mood', 'aesthetic', 'vibe', 'inspiration', 'collection', 'board', 'style'],
    confidence: 0.85,
  },
  video: {
    keywords: ['video', 'film', 'motion', 'cinematic', 'footage', 'scene', 'storyboard'],
    confidence: 0.85,
  },
  experience: {
    keywords: ['experience', 'journey', 'guide', 'explore', 'adventure', 'path', 'flow'],
    confidence: 0.8,
  },
  general: {
    keywords: [],
    confidence: 0.5,
  },
}

export function analyzeIntent(
  message: string,
  mode: UserMode,
  previousIntents?: Intent[]
): IntentAnalysis {
  const lowerMessage = message.toLowerCase()
  const matches: Array<[Intent, number]> = []

  // Score each intent based on keyword matches
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (intent === 'general') continue

    const matchCount = pattern.keywords.filter((keyword) =>
      lowerMessage.includes(keyword)
    ).length

    if (matchCount > 0) {
      const confidence = Math.min(
        pattern.confidence * (1 + matchCount * 0.1),
        1
      )
      matches.push([intent as Intent, confidence])
    }
  }

  // Mode-specific bias
  if (mode === 'home') {
    // Boost dream and story intents in home mode
    matches.forEach(([intent, conf]) => {
      if (intent === 'dream' || intent === 'story') {
        matches[matches.findIndex((m) => m[0] === intent)] = [intent, Math.min(conf * 1.2, 1)]
      }
    })
  } else if (mode === 'business') {
    // Boost campaign and poster intents in business mode
    matches.forEach(([intent, conf]) => {
      if (intent === 'campaign' || intent === 'poster') {
        matches[matches.findIndex((m) => m[0] === intent)] = [intent, Math.min(conf * 1.2, 1)]
      }
    })
  }

  // Prefer previous intents for continuity
  if (previousIntents && previousIntents.length > 0) {
    const lastIntent = previousIntents[previousIntents.length - 1]
    const existingMatch = matches.find((m) => m[0] === lastIntent)
    if (!existingMatch) {
      matches.push([lastIntent, 0.6])
    }
  }

  // Sort by confidence
  matches.sort((a, b) => b[1] - a[1])

  const topMatch = matches[0]
  const intent: Intent = topMatch ? topMatch[0] : 'general'
  const confidence = topMatch ? topMatch[1] : 0.5
  const keywords = topMatch ? INTENT_PATTERNS[topMatch[0]].keywords : []

  return {
    intent,
    confidence,
    keywords,
  }
}

export function getIntentDisplayName(intent: Intent): string {
  const names: Record<Intent, string> = {
    dream: 'Dream Visualization',
    story: 'Story Generation',
    campaign: 'Marketing Campaign',
    poster: 'Poster Design',
    moodboard: 'Moodboard Creation',
    video: 'Video Concept',
    experience: 'Guided Experience',
    general: 'Creative Assistant',
  }
  return names[intent] || 'Creative Response'
}
