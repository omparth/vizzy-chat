'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Download, Clapperboard, Film, ListOrdered, Move3d } from 'lucide-react'
import type { VideoCard as VideoCardType } from '@/types'

interface VideoCardProps {
  data: VideoCardType
}

export function VideoCard({ data }: VideoCardProps) {
  return (
    <Card className="p-5 bg-zinc-50/60 dark:bg-[#17171c] border border-zinc-200/80 dark:border-zinc-800/60 rounded-2xl shadow-none w-full max-w-2xl overflow-hidden backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4.5">
        <div className="p-2 bg-indigo-50 dark:bg-[#202026] text-indigo-500 dark:text-purple-400 rounded-xl border border-indigo-100/30 dark:border-zinc-700/30">
          <Clapperboard className="w-4 h-4" />
        </div>
        <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 tracking-wide">
          {data.title || 'Video Production Concept'}
        </h3>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-2.5 opacity-70">
          <Film className="w-3.5 h-3.5 text-zinc-400" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Storyboard Frames (16:9)
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2.5">
          {data.storyboard.map((frame, idx) => (
            <div
              key={idx}
              className="aspect-video bg-zinc-100 dark:bg-[#202026] rounded-xl overflow-hidden relative group cursor-pointer border border-zinc-200/40 dark:border-zinc-800/40 shadow-sm"
            >
              <img
                src={frame}
                alt={`Storyboard setup frame seq ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-colors duration-300 flex items-center justify-center backdrop-blur-[1px] group-hover:backdrop-blur-none">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 p-4 bg-white dark:bg-[#121215] border border-zinc-200/60 dark:border-zinc-800/50 rounded-xl">
        <div className="flex items-center gap-1.5 mb-3 opacity-70">
          <ListOrdered className="w-3.5 h-3.5 text-zinc-400" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Production Shot Breakdown
          </p>
        </div>
        
        <ul className="space-y-2.5">
          {data.shotList.map((shot, idx) => (
            <li key={idx} className="text-xs font-medium text-zinc-600 dark:text-zinc-400 flex gap-3 items-start group/shot">
              <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-500 dark:text-purple-400 bg-indigo-50/50 dark:bg-[#1c1c24] px-1.5 py-0.5 rounded border border-indigo-100/20 dark:border-zinc-800/40 min-w-[24px] text-center">
                SC_{String(idx + 1).padStart(2, '0')}
              </span>
              <span className="leading-relaxed pt-0.5 group-hover/shot:text-zinc-900 dark:group-hover/shot:text-zinc-200 transition-colors">
                {shot}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5 p-4 bg-zinc-100/40 dark:bg-[#1a1a22]/40 border border-zinc-200/30 dark:border-zinc-800/30 rounded-xl relative overflow-hidden">
        <div className="flex items-center gap-1.5 mb-1.5 opacity-70">
          <Move3d className="w-3.5 h-3.5 text-zinc-400" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Motion & Camera Dynamics
          </p>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
          {data.motionDescription}
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.002 }}
        whileTap={{ scale: 0.998 }}
      >
        <Button
          size="sm"
          variant="outline"
          className="w-full h-9 gap-2 text-xs font-semibold bg-white dark:bg-[#121215] border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-[#1c1c24] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-all duration-150 shadow-none"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400 stroke-[2.5]" />
          Compile & Download Production Manifest
        </Button>
      </motion.div>
    </Card>
  )
}
