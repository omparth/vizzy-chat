'use client'

import {
  Plus,
  MessageCircle,
  Heart,
  Settings,
  Moon,
  Sun,
  Home,
  Briefcase,
  Trash2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Conversation, UserMode } from '@/types'
import { formatDate, truncate } from '@/lib/utils'
import { useTheme } from 'next-themes'

interface SidebarProps {
  conversations: Conversation[]
  currentId: string | null
  mode: UserMode
  onNew: () => void
  onSelect: (id: string) => void
  onModeChange: (mode: UserMode) => void
  onDeleteConversation: (id: string) => void
  onOpenFavorites?: () => void
}

export function Sidebar({
  conversations,
  currentId,
  mode,
  onNew,
  onSelect,
  onModeChange,
  onDeleteConversation,
  onOpenFavorites,
}: SidebarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col h-full w-66 bg-zinc-50 dark:bg-[#17171c] text-zinc-700 dark:text-zinc-300 border-r border-zinc-200/80 dark:border-zinc-800/50 select-none flex transition-colors duration-300">
      
      <div className="p-5 flex flex-col justify-center min-h-[76px]">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.04, rotate: -2 }}
            whileTap={{ scale: 0.96 }}
            className="h-7 w-7 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 dark:from-violet-500 dark:via-purple-500 dark:to-emerald-400 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-500/20 dark:shadow-purple-500/10 relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 transition-opacity"
          >
            <span className="relative z-10 font-sans tracking-tight text-[13px] font-bold">V</span>
          </motion.div>
          <div className="flex flex-col">
            <h1 className="text-[15px] font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              Vizzy
            </h1>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium tracking-wide mt-1">
              Creative AI Assistant
            </p>
          </div>
        </div>
      </div>

      <div className="px-3.5 pb-2">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onNew}
          className="flex items-center justify-between w-full px-3.5 py-2.5 bg-white dark:bg-[#202026] border border-zinc-200/70 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-[#282830] text-zinc-800 dark:text-zinc-200 rounded-xl text-xs font-medium transition-all duration-200 group relative shadow-sm shadow-zinc-100/50 dark:shadow-none"
        >
          <div className="flex items-center gap-2.5">
            <Plus className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">New Chat</span>
          </div>
          <kbd className="text-[10px] bg-zinc-100 dark:bg-[#2b2b36] text-zinc-400 dark:text-zinc-500 px-1.5 py-0.5 rounded-md font-sans border border-zinc-200/50 dark:border-zinc-700/30">
            ⌘N
          </kbd>
        </motion.button>
      </div>

      <div className="px-3.5 py-2">
        <div className="flex p-1 bg-zinc-200/50 dark:bg-[#202026]/60 rounded-xl border border-zinc-200/30 dark:border-zinc-800/30 relative">
          {(['home', 'business'] as const).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className={`flex items-center justify-center gap-1.5 flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 relative z-10 ${
                mode === m ? 'text-zinc-900 dark:text-white font-semibold' : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              {m === 'home' ? <Home className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              <span className="capitalize">{m}</span>
              
              {mode === m && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 bg-white dark:bg-[#2b2b36] rounded-lg shadow-sm border border-zinc-200/20 dark:border-zinc-700/20 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-1">
        <p className="text-[10px] font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Recent Chats</p>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-0.5 py-1">
          <AnimatePresence initial={false}>
            {conversations.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-12 text-center"
              >
                <MessageCircle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                <p className="text-xs text-zinc-400 dark:text-zinc-600 font-medium">No history yet</p>
              </motion.div>
            ) : (
              conversations.map((conv) => {
                const isActive = currentId === conv.id
                return (
                  <motion.div
                    key={conv.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className={`group relative flex items-center justify-between rounded-xl p-2.5 cursor-pointer transition-colors duration-150 ${
                      isActive
                        ? 'text-zinc-900 dark:text-zinc-100 font-medium'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/40 dark:hover:bg-[#202026]/40 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeChatBg"
                        className="absolute inset-0 bg-zinc-200/60 dark:bg-[#202026] rounded-xl -z-10 border border-zinc-300/30 dark:border-zinc-800/60 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    <button
                      onClick={() => onSelect(conv.id)}
                      className="flex-1 text-left min-w-0 pr-6 relative z-10"
                    >
                      <div className="text-xs truncate tracking-wide">
                        {truncate(conv.title, 24)}
                      </div>
                      <div className={`text-[9px] mt-0.5 font-sans ${isActive ? 'text-zinc-500 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
                        {formatDate(conv.updated)}
                      </div>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteConversation(conv.id)
                      }}
                      className="absolute right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700/50 rounded-md text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400"
                      title="Delete Conversation"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-zinc-200/60 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-[#121217]/40 space-y-0.5">
        {onOpenFavorites && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenFavorites}
            className="w-full justify-start gap-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#202026] h-9 rounded-xl px-2.5 text-xs font-medium transition-all duration-200"
          >
            <Heart className="w-3.5 h-3.5 opacity-80" />
            Favorites
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="w-full justify-start gap-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#202026] h-9 rounded-xl px-2.5 text-xs font-medium transition-all duration-200"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 opacity-80" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 opacity-80" />
              Dark Mode
            </>
          ) }
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200/50 dark:hover:bg-[#202026] h-9 rounded-xl px-2.5 text-xs font-medium transition-all duration-200"
        >
          <Settings className="w-3.5 h-3.5 opacity-80" />
          Settings
        </Button>
      </div>
    </div>
  )
}
