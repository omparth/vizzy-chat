'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Palette, Eye } from 'lucide-react'
import type { MoodboardCard as MoodboardCardType } from '@/types'

interface MoodboardCardProps {
  data: MoodboardCardType
}

export function MoodboardCard({ data }: MoodboardCardProps) {
  return (
    <Card className="p-5 bg-zinc-50/60 dark:bg-[#17171c] border border-zinc-200/80 dark:border-zinc-800/60 rounded-2xl shadow-none w-full max-w-2xl overflow-hidden backdrop-blur-md">
      
      {/* Header with Luxury Agency Vibe */}
      <div className="flex items-center gap-2 mb-3.5">
        <div className="p-2 bg-indigo-50 dark:bg-[#202026] text-indigo-500 dark:text-purple-400 rounded-xl border border-indigo-100/30 dark:border-zinc-700/30">
          <Palette className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-wide">
          {data.title || 'Curated Moodboard'}
        </h3>
      </div>

      {/* Premium Minimalist Tokens */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {data.moodKeywords.map((keyword) => (
          <Badge 
            key={keyword} 
            variant="outline" 
            className="text-[11px] font-semibold py-0.5 px-2.5 bg-white dark:bg-[#121215] border-zinc-200 dark:border-zinc-800/80 text-zinc-600 dark:text-zinc-400 rounded-lg shadow-none"
          >
            {keyword}
          </Badge>
        ))}
      </div>

      {/* Dynamic Visual Curation Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {data.images.map((image, idx) => (
          <div
            key={idx}
            className={`group relative rounded-xl overflow-hidden border border-zinc-200/30 dark:border-zinc-800/30 bg-zinc-100 dark:bg-[#202026] shadow-sm 
              ${idx === 0 ? 'aspect-[4/3] col-span-2' : 'aspect-square'}
            `} // Enhancing layout with a focal hero image layout
          >
            <img
              src={image}
              alt={`Moodboard reference curation concept ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Premium Micro Hover Curtain */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-3">
              <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-medium backdrop-blur-md bg-white/10 px-2 py-1 rounded-md border border-white/10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-3 h-3" />
                Inspect Asset
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Studio Export Action */}
      <motion.div
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full h-9 gap-2 text-xs font-semibold bg-white dark:bg-[#121215] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-[#1c1c24] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-all duration-150 shadow-none"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          Export High-Res Moodboard Collection
        </Button>
      </motion.div>
    </Card>
  )
}