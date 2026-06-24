'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Sparkles, 
  Users, 
  Target, 
  Layers, 
  Image as ImageIcon,
  Compass, 
  Award,
  ArrowUpRight,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react'

export interface ExperienceJourneyNode {
  title: string
  description: string
}

export interface ExperienceData {
  type: 'experience'
  title: string
  audience: string
  objective: string
  journey: ExperienceJourneyNode[]
  touchpoints: string[]
  outcome: string
  visuals?: string[]
}

interface ExperienceCardProps {
  data: ExperienceData
}

export function ExperienceCard({ data }: ExperienceCardProps) {
  const [copiedNode, setCopiedNode] = useState<number | null>(null)

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopiedNode(index)
    setTimeout(() => setCopiedNode(null), 2000)
  }

  return (
    <Card className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 dark:border-zinc-800/80 dark:bg-[#0A0A0C] dark:shadow-none">
      
      <div className="flex items-start justify-between gap-4 border-b border-zinc-100/80 pb-5 dark:border-zinc-900">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-700 border border-indigo-200/40 dark:from-indigo-950/20 dark:to-indigo-900/10 dark:text-indigo-400 dark:border-indigo-900/30">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400/90">
              Interactive Experience Framework
            </span>
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {data.title || 'Immersive Blueprint'}
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 transition-colors duration-200 hover:bg-zinc-50/80 dark:border-zinc-900 dark:bg-[#121215]/40 dark:hover:bg-[#121215]/70">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <Users className="h-3.5 w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">Target Target Audience</p>
          </div>
          <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.audience}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 transition-colors duration-200 hover:bg-zinc-50/80 dark:border-zinc-900 dark:bg-[#121215]/40 dark:hover:bg-[#121215]/70">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <Target className="h-3.5 w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">Core Objective</p>
          </div>
          <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.objective}
          </p>
        </div>
      </div>

      <Tabs defaultValue="journey" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-zinc-100/80 p-1 dark:bg-[#161619]">
          <TabsTrigger value="journey" className="text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            <Layers className="h-3.5 w-3.5 mr-1" /> Journey Map
          </TabsTrigger>
          <TabsTrigger value="touchpoints" className="text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            <Compass className="h-3.5 w-3.5 mr-1" /> Touchpoints
          </TabsTrigger>
          <TabsTrigger value="assets" className="text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            <ImageIcon className="h-3.5 w-3.5 mr-1" /> Moodboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journey" className="mt-5 space-y-3 outline-none">
          <div className="relative border-l border-zinc-100 pl-4 ml-2 space-y-5 dark:border-zinc-900">
            {data.journey?.map((step, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -left-[21px] top-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-indigo-500 transition-colors duration-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-white dark:bg-[#0A0A0C]" />
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Phase 0{idx + 1}
                    </span>
                    <h4 className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleCopy(`${step.title}: ${step.description}`, idx)}
                    className="w-6 h-6 rounded opacity-0 group-hover:opacity-100 transition-all duration-150 hover:bg-zinc-50 dark:hover:bg-zinc-900 shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  >
                    {copiedNode === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 rounded-xl border border-indigo-100/60 bg-indigo-50/5 p-4 dark:border-indigo-950/40 dark:bg-indigo-950/5">
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
              <Award className="h-3.5 w-3.5" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Expected Strategic Outcome</span>
            </div>
            <p className="mt-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-300 leading-relaxed">
              {data.outcome}
            </p>
          </div>
        </TabsContent>

        <TabsContent value="touchpoints" className="mt-4 space-y-3 outline-none">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {data.touchpoints?.map((point, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-50/40 border border-zinc-100 dark:bg-[#121215]/30 dark:border-zinc-900 transition-all duration-200 hover:border-zinc-200 dark:hover:border-zinc-800"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                    {point}
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-700 shrink-0" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assets" className="mt-4 outline-none">
          <div className="grid grid-cols-2 gap-3">
            {data.visuals && data.visuals.length > 0 ? (
              data.visuals.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="group aspect-square bg-zinc-50 dark:bg-zinc-900/40 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-100 dark:border-zinc-900 relative shadow-sm"
                >
                  <div className="absolute left-2 top-2 z-10">
                    <span className="rounded-md bg-zinc-950/80 backdrop-blur-md px-2 py-1 text-[9px] font-medium text-zinc-100 border border-white/10">
                      Asset Concept {idx + 1}
                    </span>
                  </div>

                  <img
                    src={imgUrl}
                    alt={`Experience Visual concept ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('p-8', 'text-center');
                    }}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 py-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-[#121215]/20">
                <ImageIcon className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Visual engine queued</p>
              </div>
            )}
          </div>
        </TabsContent>

        <div className="mt-6 pt-4 border-t border-zinc-100/80 dark:border-zinc-900 flex flex-wrap gap-2 justify-end">
          <Button variant="ghost" className="h-8 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Modify Flow
          </Button>
          <Button variant="outline" className="h-8 rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent">
            Regenerate Steps
          </Button>
          <Button className="h-8 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Export Journey <ArrowUpRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </Tabs>
    </Card>
  )
}
