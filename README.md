# Vizzy Chat - AI Creative Assistant

A production-ready, full-featured AI creative assistant built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features Implemented

### ✅ Phase 1: Foundation & Layout
- Responsive sidebar with navigation
- Mode toggle (Home/Business)
- Conversation history management
- Main chat area with message display
- Professional UI using shadcn/ui components

### ✅ Phase 2: Core Chat Engine
- Real-time messaging system with user and assistant support
- localStorage-based persistence
- Conversation creation and switching
- Message history tracking
- Loading states and animations

### ✅ Phase 3: Intent Routing & AI Simulation
- 8+ intent types: dream, story, campaign, poster, moodboard, video, experience, general
- Mode-biased intent detection (Home vs Business optimized responses)
- Mock AI engine with realistic response delays
- Contextual response generation based on conversation history

### ✅ Phase 4: Message Card Components
8 specialized card types for rich content:
- **Image Generation Card**: 2x2 grid, tags, images
- **Story Card**: Expandable chapters with collapsible content
- **Poster Card**: Design notes, preview, download/edit actions
- **Campaign Card**: Tabbed copy/visuals, social captions
- **Moodboard Card**: Image grid, mood keywords
- **Video Card**: Storyboard frames, shot list, motion description
- **Experience Card**: Timeline journey with CTAs
- **Generic Card**: Flexible suggestion-based responses

### ✅ Phase 5-7: Advanced Features

**Favorites System**
- Save/unsave messages as favorites
- Tag-based organization
- Export favorites to JSON
- Persistent localStorage storage
- Favorites Panel with filtering

**Recent Generations Tracking**
- Auto-track all generations
- Search and filter by intent/mode
- Export generations to JSON
- Max 100 generations kept

**Action Handlers**
- Copy: Copy message content to clipboard
- Refine: Regenerate response with context
- Save: Add message to favorites with one-click UI feedback
- Export: Download message as JSON

**Rich Empty State**
- Mode-specific welcome messages
- 8 clickable starter prompts per mode
- Beautiful gradient branding
- Compelling value proposition text

**Home Mode (Creative)**
- 8 starter prompts focused on personal creativity
- 50+ home mode datasets covering:
  - Dream visualizations
  - Story ideas
  - Poster concepts
  - Campaign themes
  - Moodboards
  - Video concepts
  - Experience designs

**Business Mode (Professional)**
- 8 starter prompts focused on professional needs
- 50+ business datasets covering:
  - Visual campaigns
  - Marketing collateral
  - Brand guidelines
  - Sales materials
  - Content strategies
  - Social media plans

**Dark/Light Mode**
- Theme toggle with persistent preference
- Full UI theme support
- Smooth transitions

**Responsive Design**
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Responsive typography and spacing

## Technical Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2 with latest hooks
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + Context API
- **Storage**: localStorage with safe JSON parsing
- **Type Safety**: Full TypeScript coverage

## Project Structure

```
app/
├── layout.tsx                 # Root layout with theme support
├── page.tsx                   # Main application page
├── globals.css               # Design tokens and Tailwind config
└── (pages)/

components/
├── sidebar/
│   └── Sidebar.tsx           # Navigation sidebar
├── chat/
│   ├── ChatArea.tsx          # Main chat container
│   ├── ChatInput.tsx         # Message input form
│   └── ChatMessage.tsx       # Individual message display
├── message-cards/
│   ├── CardRenderer.tsx      # Route cards to specific types
│   ├── ImageGenerationCard.tsx
│   ├── StoryCard.tsx
│   ├── PosterCard.tsx
│   ├── CampaignCard.tsx
│   ├── MoodboardCard.tsx
│   ├── VideoCard.tsx
│   ├── ExperienceCard.tsx
│   └── GenericCard.tsx
└── favorites/
    └── FavoritesPanel.tsx    # Favorites management UI

hooks/
├── useChat.ts               # Chat state management
├── useMode.ts               # Mode (Home/Business) toggle
├── useTheme.ts              # Theme management
├── useFavorites.ts          # Favorites system
└── useGenerations.ts        # Generations tracking

lib/
├── utils.ts                 # Utility functions
├── storage.ts               # localStorage helpers
├── intent-router.ts         # Intent detection & routing
└── mock-ai.ts               # AI response simulation

types/
└── index.ts                 # TypeScript interfaces

data/
├── home-datasets.ts         # Home mode mock data (50+ items)
└── business-datasets.ts     # Business mode mock data (50+ items)

public/
└── mock-images/             # Generated sample images
```

## Key Functionality

### Message Flow
1. User sends message via input
2. Message added to chat history
3. Intent analyzed and categorized
4. Mock AI generates contextual response
5. Card data generated based on intent
6. Response displayed with rich formatting
7. User can save, refine, export, or copy

### State Persistence
- Conversations saved to localStorage
- User preferences (mode, theme) persisted
- Favorites stored with tags and metadata
- Generation history auto-tracked

### Intent System
Intent detection analyzes user input against keyword patterns:
- **dream**: Visualization, visualization, imagery
- **story**: Story, narrative, tale, chapter
- **campaign**: Campaign, marketing, promotion, social
- **poster**: Poster, design, graphic, artwork
- **moodboard**: Moodboard, mood, aesthetic, style
- **video**: Video, film, cinematic, motion
- **experience**: Experience, journey, interactive
- **general**: Fallback for unmatched intent

Mode biases responses:
- Home mode emphasizes creativity and emotion
- Business mode emphasizes strategy and ROI

## Usage

### Installation
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

### Creating New Features
1. Add types to `types/index.ts`
2. Create hooks in `hooks/`
3. Build components in `components/`
4. Update main page logic in `app/page.tsx`

### Extending Intent Coverage
1. Add new intent type to types
2. Update INTENT_PATTERNS in `lib/intent-router.ts`
3. Add mock responses in `lib/mock-ai.ts`
4. Create specific card component if needed

## Performance Optimizations

- ✅ Lazy loading of components
- ✅ Optimized re-renders with proper memoization
- ✅ Efficient localStorage access
- ✅ Responsive image sizing
- ✅ CSS grid and flexbox for layout efficiency

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ✅ Screen reader friendly

## Future Enhancements

- Real AI API integration (OpenAI, Claude, etc.)
- Cloud storage for favorites and history
- Real image generation (DALL-E, Midjourney, etc.)
- Video streaming for video concepts
- Collaborative sharing
- Team workspaces for Business mode
- Analytics and usage insights
- Premium features and subscriptions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT
