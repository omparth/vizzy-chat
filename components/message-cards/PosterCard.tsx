'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Edit3, Image, Compass, Sparkles } from 'lucide-react'
import type { PosterCard as PosterCardType } from '@/types'

interface PosterCardProps {
  data: PosterCardType
}

export function PosterCard({ data }: PosterCardProps) {
  return (
    <Card className="p-5 bg-zinc-50/60 dark:bg-[#17171c] border border-zinc-200/80 dark:border-zinc-800/60 rounded-2xl shadow-none w-full max-w-xl overflow-hidden backdrop-blur-md">
      
      {/* Studio Header Meta block */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Image className="w-3.5 h-3.5 text-indigo-500 dark:text-purple-400" />
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-wide">
            {data.title || 'Print/Digital Layout'}
          </h3>
        </div>
        {data.subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            {data.subtitle}
          </p>
        )}
      </div>

      {/* Cinematic Studio Ratio Poster Preview Container */}
      <div className="group relative mb-5 bg-zinc-100 dark:bg-[#202026] rounded-xl overflow-hidden aspect-[2/3] border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm flex items-center justify-center">
        <img
          src={data.imageUrl}
          alt={`Visual canvas render of ${data.title}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
          loading="lazy"
        />

        {/* Premium Dark Vignette Floating Overlay on Image Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-zinc-950/0 to-zinc-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Structured Studio Design Blueprint Notes */}
      {data.designNotes && data.designNotes.length > 0 && (
        <div className="mb-5 p-3.5 bg-white dark:bg-[#121215] border border-zinc-200/60 dark:border-zinc-800/50 rounded-xl">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Creative Design Blueprint
            </p>
          </div>
          
          <ul className="text-xs space-y-2 font-medium">
            {data.designNotes.map((note, idx) => (
              <li key={idx} className="flex gap-2.5 items-start text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-purple-400 mt-1.5 flex-shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Controller Block */}
      <div className="flex gap-2.5 pt-1 border-t border-zinc-200/50 dark:border-zinc-800/40">
        <Button 
          size="sm" 
          variant="outline" 
          className="gap-1.5 flex-1 h-8.5 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-[#202026] text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          Export Canvas
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          className="gap-1.5 flex-1 h-8.5 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-[#202026] text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-zinc-400" />
          Modify Directives
        </Button>
      </div>
    </Card>
  )
}