'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, HelpCircle, ArrowUpRight } from 'lucide-react'
import type { GenericCard as GenericCardType } from '@/types'

interface GenericCardProps {
  data: GenericCardType
}

export function GenericCard({ data }: GenericCardProps) {
  return (
    <Card className="p-5 bg-zinc-50/60 dark:bg-[#17171c] border border-zinc-200/80 dark:border-zinc-800/60 rounded-2xl shadow-none w-full max-w-2xl overflow-hidden backdrop-blur-md">
      
      <div className="flex items-center gap-1.5 mb-3.5 opacity-60">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Response Context
        </span>
      </div>

      <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 mb-5 leading-relaxed font-medium whitespace-pre-wrap selection:bg-indigo-500/10">
        {data.content}
      </p>

      {data.suggestions && data.suggestions.length > 0 && (
        <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/40">
          <div className="flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
            <p className="text-xs font-bold tracking-wide text-zinc-400 dark:text-zinc-500">
              Suggested Next Steps:
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.suggestions.map((suggestion, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="group w-full text-left justify-between items-center text-xs h-auto py-2.5 px-3.5 bg-white dark:bg-[#121215] hover:bg-zinc-100 dark:hover:bg-[#1c1c24] border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-all duration-150 shadow-none relative overflow-hidden"
                >
                  <span className="truncate pr-2 font-medium">
                    {suggestion}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200 flex-shrink-0" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
