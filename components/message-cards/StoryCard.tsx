//components/message-cards/StoryCard.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, BookOpen, Sparkles, Image as ImageIcon } from 'lucide-react'
import type { StoryCard as StoryCardType } from '@/types'

interface StoryCardProps {
  data: StoryCardType
}

export function StoryCard({ data }: StoryCardProps) {
  console.log('STORY DATA =>', data)
  const [expanded, setExpanded] = useState<number | null>(null)

  const toggleExpand = (idx: number) => {
    setExpanded(prev => (prev === idx ? null : idx))
  }

  return (
    <Card className="p-6 bg-white dark:bg-[#0D0D11] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm w-full max-w-2xl overflow-hidden transition-all duration-300">
      
      {/* Narrative Premium Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 tracking-tight">
              {data.title || 'Generated Script Concept'}
            </h3>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-amber-500/80" /> AI Screenplay Draft
            </p>
          </div>
        </div>
      </div>

      {/* Story Overview */}
      <div className="mb-6 rounded-xl border border-zinc-100 dark:border-zinc-800/40 p-4 bg-zinc-50/50 dark:bg-[#13131A]">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 font-bold">
          Story Overview
        </p>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 font-normal">
          {data.summary}
        </p>
      </div>

      {/* Story Characters */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 font-bold">
          Main Characters
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(data.characters || []).map((character: string) => (
            <span
              key={character}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border border-zinc-200/30 dark:border-zinc-700/30"
            >
              {character}
            </span>
          ))}
        </div>
      </div>

      {/* Accordion Stack Layer */}
      <div className="space-y-2 mb-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 font-bold">
          Chapters & Script
        </p>
        
        {data.chapters.map((chapter, idx) => {
          const isCurrentExpanded = expanded === idx

          return (
            <div
              key={idx}
              className="bg-white dark:bg-[#13131A] border border-zinc-200/60 dark:border-zinc-800/40 rounded-xl overflow-hidden transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full text-left flex items-center justify-between p-3.5 outline-none select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-semibold font-mono tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-200/50 dark:border-zinc-700/50">
                    CH_{String(idx + 1).padStart(2, '0')}
                  </span>
                  <h4 className="font-medium text-zinc-800 dark:text-zinc-200 text-xs md:text-sm truncate">
                    {chapter.title}
                  </h4>
                </div>
                
                <div className="flex-shrink-0 ml-2">
                  <ChevronDown 
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ease-[0.16, 1, 0.3, 1] ${
                      isCurrentExpanded ? 'rotate-180 text-zinc-700 dark:text-zinc-200' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Seamless Height Expansion Container */}
              <AnimatePresence initial={false}>
                {isCurrentExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-zinc-100 dark:border-zinc-800/40 bg-zinc-50/30 dark:bg-[#0D0D11]/30">
                      <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal whitespace-pre-wrap selection:bg-zinc-500/10">
                        {chapter.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Story Moral */}
      <div className="mb-6 rounded-xl border border-zinc-100 dark:border-zinc-800/40 p-4 bg-zinc-50/20 dark:bg-[#13131A]/40">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2 font-bold">
          Theme / Moral
        </p>
        <p className="text-xs italic leading-relaxed text-zinc-500 dark:text-zinc-400">
          "{data.moral}"
        </p>
      </div>

      {/* Scene Visualizations */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 font-bold flex items-center gap-1.5">
          <ImageIcon className="w-3 h-3" /> Scene Visualizations
        </p>

        <div className="grid grid-cols-2 gap-3">
          {(data.visuals || []).map((img: string, idx: number) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="aspect-video rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 relative bg-zinc-100 dark:bg-zinc-900 group shadow-sm"
            >
              <img
                src={img}
                alt={`Scene ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-90 transition-opacity" />
              
              <div className="absolute bottom-2.5 left-2.5">
                <span className="bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 text-[10px] font-medium px-2 py-1 rounded-md shadow-sm border border-zinc-200/20">
                  Scene {idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Action Button */}
      <Button 
        size="sm" 
        variant="outline" 
        className="w-full h-10 gap-2 text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 border-none rounded-xl transition-all duration-150 shadow-sm"
      >
        Compile & View Full Narrative Screenplay
      </Button>
    </Card>
  )
}