
export type UserMode = 'home' | 'business'
export type MessageRole = 'user' | 'assistant'
export type Intent = 
  | 'dream'
  | 'story'
  | 'campaign'
  | 'poster'
  | 'moodboard'
  | 'video'
  | 'experience'
  | 'general'

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
  intent?: Intent
  cardData?: CardData
}

export interface Conversation {
  id: string
  title: string
  mode: UserMode
  messages: Message[]
  created: number
  updated: number
}

export interface UserPreferences {
  mode: UserMode
  colorPreference?: string
  stylePreference?: string
  brandColors?: string[]
  theme: 'light' | 'dark'
}



export interface SocialCaption {
  title: string
  platform: string
  caption: string
  objective: string
}


export type CardType = 
  | 'image-generation'
  | 'story'
  | 'poster'
  | 'campaign'
  | 'moodboard'
  | 'video'
  | 'experience'
  | 'generic'

export interface CardData {
  type: CardType
  title?: string
  content?: string
  images?: string[]
  metadata?: Record<string, unknown>
}

export interface ImageCard extends CardData {
  type: 'image-generation'
  title: string
  images: string[]
  description: string
  tags: string[]
}

export interface StoryCard extends CardData {
  type: 'story'
  title: string

  summary?: string

  characters?: string[]

  moral?: string

  visuals?: string[]

  chapters: StoryChapter[]
}

export interface StoryChapter {
  title: string
  content: string
  imageUrl?: string
}

export interface PosterCard extends CardData {
  type: 'poster'
  title: string
  subtitle?: string
  imageUrl: string
  designNotes?: string[]
}

export interface CampaignCard extends CardData {
  type: 'campaign'
  title: string
  copy: string
  socialCaptions: { platform: string; caption: string }[]
  visuals: string[]
}

export interface MoodboardCard extends CardData {
  type: 'moodboard'
  title: string
  images: string[]
  moodKeywords: string[]
}

export interface VideoCard extends CardData {
  type: 'video'
  title: string
  storyboard: string[]
  shotList: string[]
  motionDescription: string
}

export interface ExperienceCard extends CardData {
  type: 'experience'
  title: string
  journey: JourneyStep[]
}

export interface JourneyStep {
  title: string
  description: string
  action?: string
}

export interface GenericCard extends CardData {
  type: 'generic'
  content: string
  suggestions?: string[]
}

export interface IntentAnalysis {
  intent: Intent
  confidence: number
  keywords: string[]
  context?: string
}

export interface Favorite {
  id: string
  messageId: string
  title?: string
  content: string
  cardData?: CardData
  intent?: Intent
  timestamp: number
  tags?: string[]
}

export interface Generation {
  id: string
  prompt: string
  response: string
  cardData?: CardData
  intent: Intent
  mode: UserMode
  timestamp: number
  isFavorite: boolean
}
