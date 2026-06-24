'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Download, Maximize2, Sparkles } from 'lucide-react'
import type { ImageCard } from '@/types'
import { useState } from 'react'

interface ImageGenerationCardProps {
  data: ImageCard
}

export function ImageGenerationCard({ data }: ImageGenerationCardProps) {

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const isProcessing = false
  return (  <div className="w-full max-w-2xl">      
     <div className="mb-4">
  <div className="flex items-center gap-2">
    <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />

    <h3 className="font-semibold text-sm">
      {data.title}
    </h3>




  </div>

  <p className="text-xs text-zinc-500 mt-1">
    {data.description}
  </p>
</div>

<div className="mb-4 flex flex-wrap gap-2">
  <Badge>AI Generated</Badge>
  <Badge>4 Variations</Badge>
  <Badge>Ultra Quality</Badge>
</div>

{isProcessing && (
  <div className="mb-5">
    <div className="flex justify-between text-xs mb-2">
      <span>Generating Images...</span>
      <span>100%</span>
    </div>

    <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
        style={{
          width: `100%`
                }}
      />
    </div>
  </div>
)}
      <div className="grid grid-cols-2 gap-3 mb-4">
      {isProcessing
  ? Array.from({ length: 4 }).map((_, idx) => (
      <div
        key={idx}
        className="aspect-square rounded-xl bg-zinc-800 animate-pulse"
      />
    ))
  : data.images.map((image, idx) => (
    
<motion.div
  key={idx}
  initial={{
    opacity: 0,
    scale: 0.95
  }}
  animate={{
    opacity: 1,
    scale: 1
  }}
  transition={{
    delay: idx * 0.15,
    type: "spring",
    stiffness: 300,
    damping: 20
  }}
  whileHover={{ y: -2 }}
              className="group aspect-square bg-zinc-100 dark:bg-[#202026] rounded-xl flex items-center justify-center overflow-hidden border border-zinc-200/40 dark:border-zinc-800/40 relative shadow-sm"
          >
            <img
  src={image}
  alt={`Generated asset element ${idx + 1}`}
  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
  loading="lazy"
  onClick={() => setSelectedImage(image)}
/>

            <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px] flex items-center justify-center gap-2">
            <Button
  size="icon"
  variant="secondary"
  onClick={(e) => {
    e.stopPropagation()
    setSelectedImage(image)
  }}
>
                <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-zinc-900 shadow-sm border border-white/20 transition-transform scale-95 group-hover:scale-100 duration-200"
                title="Download this image"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(image, '_blank')
                }}              >
                <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {data.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {data.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-[10px] font-semibold tracking-wide bg-zinc-200/50 dark:bg-[#202026] text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-[#2b2b36] border border-zinc-300/20 dark:border-zinc-700/20 rounded-md px-2 py-0.5"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 pt-1 border-t border-zinc-200/50 dark:border-zinc-800/40">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 h-8 px-3 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-[#202026] text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-zinc-400 group-hover:rotate-180 transition-transform duration-500" />
          Regenerate Variant
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 h-8 px-3 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-[#202026] text-zinc-700 dark:text-zinc-300 text-xs font-medium transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          Download Batch (.zip)
        </Button>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation()
            setSelectedImage(null)
          }}        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}