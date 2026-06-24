'use client'

import { useState } from 'react'
import { Heart, X, Tag, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useFavorites } from '@/hooks/useFavorites'
import type { Favorite } from '@/types'

interface FavoritesPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function FavoritesPanel({ isOpen, onClose }: FavoritesPanelProps) {
  const { favorites, removeFavorite, removeTag, exportFavorites } = useFavorites()
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)

  if (!isOpen) return null

  const filteredFavorites = selectedFilter
    ? favorites.filter((fav) => fav.tags?.includes(selectedFilter))
    : favorites

  const allTags = Array.from(
    new Set(favorites.flatMap((fav) => fav.tags || []))
  )

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Favorites</h2>
            <span className="text-sm text-muted-foreground">({favorites.length})</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {allTags.length > 0 && (
          <div className="border-b border-border p-4">
            <p className="text-sm font-medium mb-2">Filter by tags:</p>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedFilter === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(null)}
              >
                All
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedFilter === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        )}

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredFavorites.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No favorites yet. Save your best creations!</p>
              </div>
            ) : (
              filteredFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">
                        {favorite.title || 'Untitled'}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {favorite.content}
                      </p>
                      {favorite.tags && favorite.tags.length > 0 && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {favorite.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs cursor-pointer hover:opacity-75"
                              onClick={() => removeTag(favorite.id, tag)}
                            >
                              {tag} ×
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {favorites.length > 0 && (
          <div className="border-t border-border p-4 flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={exportFavorites}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
