// components/message-cards/CampaignCard.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Copy, 
  Check, 
  Megaphone, 
  Layers, 
  Image as ImageIcon, 
  Search, 
  Target, 
  Sparkles, 
  Clock, 
  Compass,
  ArrowUpRight
} from 'lucide-react'

export interface SocialCaption {
  stage: string
  objective: string
  caption: string
  platform: string
}

export interface CampaignData {
  title: string
  goal: string
  audience: string[]
  duration: string
  platforms: string[]
  tone: string[]
  strategy: {
    keyMessage: string
    valueProposition: string
    emotion: string
    cta: string
  }
  socialCaptions: SocialCaption[]
  visuals?: string[]
}

interface CampaignCardProps {
  data: CampaignData
}

export function CampaignCard({ data }: CampaignCardProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const handleCopy = (text: string, identifier: string | number) => {
    navigator.clipboard.writeText(text)
    if (typeof identifier === 'number') {
      setCopiedIndex(identifier)
      setTimeout(() => setCopiedIndex(null), 2000)
    } else {
      setCopiedSection(identifier)
      setTimeout(() => setCopiedSection(null), 2000)
    }
  }

  const pinterestSearchQuery = `${data.title || 'Coffee'} branding, minimalist aesthetic layout, social media mockup, modern creative typography`

  return (
    <Card className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-zinc-200/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 dark:border-zinc-800/80 dark:bg-[#0A0A0C] dark:shadow-none">
      
      {/* Top Header */}
      <div className="flex items-start justify-between gap-4 border-b border-zinc-100/80 pb-5 dark:border-zinc-900">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-700 border border-amber-200/40 dark:from-amber-950/20 dark:to-amber-900/10 dark:text-amber-400 dark:border-amber-900/30">
            <Megaphone className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400/90">
              Campaign Matrix Blueprint
            </span>
            <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {data.title || 'Untitled Campaign'}
            </h3>
          </div>
        </div>
        
        <div className="hidden items-center gap-1.5 rounded-full bg-zinc-50 px-2.5 py-1 border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800/60 sm:flex">
          <Clock className="h-3 w-3 text-zinc-400" />
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{data.duration || '14 Days'}</span>
        </div>
      </div>

      {/* Analytical Targets Metadata Grid */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Goal Block */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 transition-colors duration-200 hover:bg-zinc-50/80 dark:border-zinc-900 dark:bg-[#121215]/40 dark:hover:bg-[#121215]/70">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <Target className="h-3.5 w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">Campaign Goal</p>
          </div>
          <p className="mt-2 text-xs font-medium leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.goal}
          </p>
        </div>

        {/* Audience Checklist */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 transition-colors duration-200 hover:bg-zinc-50/80 dark:border-zinc-900 dark:bg-[#121215]/40 dark:hover:bg-[#121215]/70">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <Compass className="h-3.5 w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">Target Audience</p>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {data.audience?.map((tag, idx) => (
              <span key={idx} className="inline-block rounded-md border border-zinc-200/40 bg-zinc-100/80 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700/30 dark:bg-zinc-800/60 dark:text-zinc-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Channels and Brand Tones */}
        <div className="rounded-xl border border-zinc-100 bg-zinc-50/40 p-4 transition-colors duration-200 hover:bg-zinc-50/80 dark:border-zinc-900 dark:bg-[#121215]/40 dark:hover:bg-[#121215]/70">
          <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
            <Sparkles className="h-3.5 w-3.5" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">Tone & Touchpoints</p>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {data.platforms?.map((p, idx) => (
              <span key={idx} className="inline-block rounded-md border border-amber-200/30 bg-amber-500/5 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:border-amber-900/30 dark:text-amber-400">
                {p}
              </span>
            ))}
            {data.tone?.map((t, idx) => (
              <span key={idx} className="inline-block rounded-md border border-zinc-200/40 bg-zinc-100/80 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700/30 dark:bg-zinc-800/60 dark:text-zinc-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Controller */}
      <Tabs defaultValue="strategy" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-xl bg-zinc-100/80 p-1 dark:bg-[#161619]">
          <TabsTrigger value="strategy" className="text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            Core Strategy
          </TabsTrigger>
          <TabsTrigger value="funnel" className="flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            <Layers className="h-3.5 w-3.5" /> Funnel Sequence
          </TabsTrigger>
          <TabsTrigger value="assets" className="flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-lg transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:data-[state=active]:bg-[#222227] dark:text-zinc-400 dark:data-[state=active]:text-zinc-100">
            <ImageIcon className="h-3.5 w-3.5" /> Visuals
          </TabsTrigger>
        </TabsList>

        {/* CORE STRATEGY TAB PANEL */}
        <TabsContent value="strategy" className="mt-4 space-y-4 outline-none">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            
            {/* Key Message block */}
            <div className="group relative rounded-xl border border-zinc-100 bg-white p-4 transition-all duration-200 hover:border-zinc-200 dark:border-zinc-900 dark:bg-transparent dark:hover:border-zinc-800">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Key Message</span>
              <p className="mt-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">{data.strategy?.keyMessage}</p>
              <Button size="icon" variant="ghost" onClick={() => handleCopy(data.strategy?.keyMessage, 'msg')} className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                {copiedSection === 'msg' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>

            {/* Value Proposition block */}
            <div className="group relative rounded-xl border border-zinc-100 bg-white p-4 transition-all duration-200 hover:border-zinc-200 dark:border-zinc-900 dark:bg-transparent dark:hover:border-zinc-800">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Value Proposition</span>
              <p className="mt-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">{data.strategy?.valueProposition}</p>
              <Button size="icon" variant="ghost" onClick={() => handleCopy(data.strategy?.valueProposition, 'prop')} className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
                {copiedSection === 'prop' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>

            {/* Emotion block */}
            <div className="rounded-xl border border-zinc-100 bg-white p-4 dark:border-zinc-900 dark:bg-transparent">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">Customer Emotion Focus</span>
              <p className="mt-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">{data.strategy?.emotion}</p>
            </div>

            {/* CTA block */}
            <div className="group relative rounded-xl border border-amber-100 bg-amber-50/10 p-4 dark:border-amber-950/20 dark:bg-amber-950/5">
              <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Primary Conversion CTA</span>
              <p className="mt-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                {data.strategy?.cta} <ArrowUpRight className="h-3 w-3 opacity-50" />
              </p>
              <Button size="icon" variant="ghost" onClick={() => handleCopy(data.strategy?.cta, 'cta')} className="absolute right-2 top-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-all text-amber-600 dark:text-amber-400">
                {copiedSection === 'cta' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
          
          {/* Performance Forecast */}
          <div className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-900">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              AI Performance Forecast
            </h4>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {[
                { label: 'Audience Match', value: 92 },
                { label: 'Engagement Potential', value: 88 },
                { label: 'Conversion Potential', value: 84 },
                { label: 'Brand Alignment', value: 95 },
              ].map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    <span>{metric.label}</span>
                    <span className="text-zinc-900 dark:text-zinc-200">{metric.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* FUNNEL SEQUENCE TAB PANEL */}
        <TabsContent value="funnel" className="mt-4 space-y-3 outline-none">
          {data.socialCaptions?.map((item, idx) => (
            <div key={idx} className="group/item flex gap-4 items-start p-4 bg-zinc-50/30 dark:bg-[#121215]/30 border border-zinc-100 dark:border-zinc-900 rounded-xl hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-200">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-500/5 dark:text-amber-400 px-2 py-0.5 rounded border border-amber-500/10">
                      {item.stage}
                    </span>
                    <span className="text-[10px] text-zinc-300 dark:text-zinc-700 hidden sm:inline-block">•</span>
                    <span className="text-[11px] text-zinc-400 font-medium italic">
                      Obj: {item.objective}
                    </span>
                  </div>
                  <span className="text-[9px] font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded">
                    {item.platform}
                  </span>
                </div>
                
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal whitespace-pre-wrap">
                  {item.caption}
                </p>
              </div>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleCopy(item.caption, idx)}
                className="w-7 h-7 rounded-md opacity-0 group-hover/item:opacity-100 transition-all duration-150 hover:bg-zinc-100 dark:hover:bg-zinc-900 shrink-0 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          ))}

          {/* Smart Pinterest Helper Section */}
          <div className="p-3 rounded-xl bg-zinc-50/50 border border-zinc-100 dark:bg-[#121215]/40 dark:border-zinc-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider">Design Reference Search Query</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 italic">"{pinterestSearchQuery}"</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCopy(pinterestSearchQuery, 'pinSearch')}
              className="h-7 text-[10px] font-medium rounded-lg border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0 bg-white dark:bg-transparent"
            >
              {copiedSection === 'pinSearch' ? 'Copied Moodboard Tags' : 'Copy Visual Tags'}
            </Button>
          </div>

          {/* Posting Schedule */}
          <div className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-900">
            <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Recommended Posting Schedule
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { time: 'Mon 9:00 AM', stage: 'Awareness' },
                { time: 'Wed 12:00 PM', stage: 'Benefits' },
                { time: 'Fri 6:00 PM', stage: 'Social Proof' },
                { time: 'Sun 10:00 AM', stage: 'Conversion' }
              ].map((schedule, i) => (
                <div key={i} className="bg-zinc-50/50 dark:bg-[#141417]/20 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-900/60 text-center">
                  <p className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200">{schedule.time}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{schedule.stage}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* VISUAL ASSETS MOODBOARD PANEL */}
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
                      {
                        [
                          'Instagram Post',
                          'Instagram Story',
                          'Facebook Banner',
                          'Promo Poster',
                        ][idx] || 'Campaign Asset'
                      }
                    </span>
                  </div>

                  <img
                    src={imgUrl}
                    alt={`Campaign Asset ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    loading="lazy"
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 py-12 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-[#121215]/20">
                <ImageIcon className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium">Aesthetic visual canvas engine queued</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Bottom Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-100/80 dark:border-zinc-900 flex flex-wrap gap-2 justify-end">
          <Button variant="ghost" className="h-8 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            Refine Campaign
          </Button>
          <Button variant="outline" className="h-8 rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent">
            Generate Variants
          </Button>
          <Button variant="outline" className="h-8 rounded-lg text-xs font-medium border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent">
            More Visuals
          </Button>
          <Button className="h-8 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200">
            Export Blueprint
          </Button>
        </div>
      </Tabs>
    </Card>
  )
}