'use client'

import { motion } from 'framer-motion'
import type { CardData } from '@/types'
import { ImageGenerationCard } from './ImageGenerationCard'
import { StoryCard } from './StoryCard'
import { PosterCard } from './PosterCard'
import { CampaignCard } from './CampaignCard'
import { MoodboardCard } from './MoodboardCard'
import { VideoCard } from './VideoCard'
import { ExperienceCard } from './ExperienceCard'
import { GenericCard } from './GenericCard'

interface CardRendererProps {
  data: CardData
}

export function CardRenderer({ data }: CardRendererProps) {
  const renderCard = () => {
    switch (data.type) {
      case 'image-generation':
        return <ImageGenerationCard data={data as any} />
      case 'story':
        return <StoryCard data={data as any} />
      case 'poster':
        return <PosterCard data={data as any} />
      case 'campaign':
        return <CampaignCard data={data as any} />
      case 'moodboard':
        return <MoodboardCard data={data as any} />
      case 'video':
        return <VideoCard data={data as any} />
      case 'experience':
        return <ExperienceCard data={data as any} />
      default:
        return <GenericCard data={data as any} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="w-full mt-3 clear-both flex flex-col items-start"
    >
      {renderCard()}
    </motion.div>
  )
}
