//lib/mock-ai.ts

import type {
  Intent,
  CardData,
  UserMode,
  ImageCard,
  StoryCard,
  PosterCard,
  CampaignCard,
  MoodboardCard,
  VideoCard,
  ExperienceCard,
} from '@/types'
import { getRandomItem } from '@/lib/utils'
import { HOME_STARTER_PROMPTS } from '@/data/home-datasets'
import { BUSINESS_STARTER_PROMPTS } from '@/data/business-datasets'

// Mock response templates
const MOCK_RESPONSES: Record<Intent, Record<UserMode, string[]>> = {
  dream: {
    home: [
      'I&apos;ve visualized your dream. Creating immersive imagery that captures your inner vision...',
      'Let me paint your dream into reality. Generating visual representations of your aspirations...',
      'Your dream deserves visual form. Creating stunning imagery that resonates with your feelings...',
    ],
    business: [
      'Transforming your vision into compelling business imagery...',
      'Creating professional visual assets that reflect your aspirations...',
      'Generating premium business-focused creative content...',
    ],
  },
  story: {
    home: [
      'Weaving a beautiful narrative from your imagination. Generating chapters with vivid descriptions...',
      'Creating an enchanting story that captures your emotions. Building scenes and characters...',
      'Your story is unfolding. Generating chapters with immersive world-building...',
    ],
    business: [
      'Crafting a compelling brand narrative with strategic messaging...',
      'Creating a story that showcases your business value and impact...',
      'Developing a narrative arc that engages your audience...',
    ],
  },
  campaign: {
    home: [
      'Building a creative campaign around your idea. Generating copy, visuals, and social content...',
      'Launching your campaign vision. Creating cohesive marketing assets...',
      'Designing an integrated campaign strategy with multiple touchpoints...',
    ],
    business: [
      'Developing a comprehensive marketing campaign with targeted messaging...',
      'Creating a multi-channel campaign strategy with professional assets...',
      'Building a data-driven campaign with compelling creative elements...',
    ],
  },
  poster: {
    home: [
      'Designing a beautiful poster that brings your ideas to life...',
      'Creating stunning poster artwork with composition and typography...',
      'Crafting a visually striking poster design for your concept...',
    ],
    business: [
      'Designing a professional poster for maximum impact and engagement...',
      'Creating a business-focused poster design with strategic messaging...',
      'Developing a premium poster that communicates your brand...',
    ],
  },
  moodboard: {
    home: [
      'Curating a moodboard that captures your aesthetic preferences...',
      'Creating a visual collection that represents your style and inspiration...',
      'Building a moodboard with carefully selected imagery and design elements...',
    ],
    business: [
      'Assembling a professional moodboard that guides your brand direction...',
      'Creating a curated visual reference collection for your design strategy...',
      'Building a moodboard that aligns with your business objectives...',
    ],
  },
  video: {
    home: [
      'Conceptualizing a video that brings your story to motion. Generating storyboards...',
      'Creating a cinematic concept with shot descriptions and motion planning...',
      'Developing video concepts with detailed storyboarding and visual direction...',
    ],
    business: [
      'Developing a compelling video concept for your marketing objectives...',
      'Creating a professional video strategy with detailed storyboards...',
      'Conceptualizing a video that drives engagement and conversions...',
    ],
  },
  experience: {
    home: [
      'Guiding you through an immersive experience journey. Creating interactive elements...',
      'Designing an experience that engages your senses and emotions...',
      'Creating an adventure-like experience with meaningful moments...',
    ],
    business: [
      'Designing a customer experience journey with key touchpoints...',
      'Creating an engagement experience that builds brand loyalty...',
      'Developing an experience strategy that enhances customer value...',
    ],
  },
  general: {
    home: [
      'Exploring your creative idea. Let me help you develop this further...',
      'I&apos;m here to help you bring your vision to life. Let me assist you...',
      'Let&apos;s create something amazing together. What would you like to explore?',
    ],
    business: [
      'Analyzing your business needs. Let me provide strategic recommendations...',
      'I&apos;m ready to help elevate your business. What&apos;s your objective?',
      'Let&apos;s develop a solution that drives results...',
    ],
  },
}

// Mock card data generators
function generateImageCard(intent: Intent, mode: UserMode): ImageCard {
  const mockImages = [
    '/mock-images/sample-1.jpg',
    '/mock-images/sample-2.jpg',
    '/mock-images/sample-3.jpg',
    '/mock-images/sample-4.jpg',
  ]

  return {
    type: 'image-generation',
    title: `Generated Images - ${intent}`,
    images: mockImages,
    description: 'Here are some creative interpretations based on your input',
    tags: ['generated', 'creative', intent],
  }
}

function generateCustomImageCard(
  title: string,
  images: string[]
): ImageCard {
  return {
    type: 'image-generation',
    title,
    images,
    description: 'AI generated premium visual concepts',
    tags: ['ai', 'generated', 'premium'],
  }
}
function generateStoryCard(intent: Intent, mode: UserMode): StoryCard {
  return {
    type: 'story',
    title: mode === 'home' ? 'Your Story Unfolds' : 'Brand Narrative',
    chapters: [
      {
        title: 'Chapter 1: The Beginning',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        title: 'Chapter 2: The Journey',
        content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        title: 'Chapter 3: The Resolution',
        content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  }
}

function generatePosterCard(intent: Intent, mode: UserMode): PosterCard {
  return {
    type: 'poster',
    title: 'Poster Design',
    imageUrl: '/mock-images/poster-sample.jpg',
    subtitle: mode === 'home' ? 'Your Artistic Vision' : 'Professional Poster Design',
    designNotes: [
      'Bold typography for maximum impact',
      'Strategic color composition',
      'Clean layout hierarchy',
      'Professional finishing touches',
    ],
  }
}

function generateCampaignCard(intent: Intent, mode: UserMode): CampaignCard {
  return {
    type: 'campaign',
    title: 'Marketing Campaign',
    copy: mode === 'home' 
      ? 'An inspiring campaign that resonates with your audience'
      : 'A strategic campaign designed to drive engagement and conversions',
    socialCaptions: [
      { platform: 'Instagram', caption: 'Check out this amazing campaign! 🚀 #creative' },
      { platform: 'Twitter', caption: 'Excited to share our new campaign. What do you think?' },
      { platform: 'Facebook', caption: 'Introducing our latest campaign - we think you&apos;ll love it!' },
    ],
    visuals: [
      '/home/instagram-post-1.jpeg',
      '/home/instagram-post-2.jpeg',
    ]  }
}

function generateMoodboardCard(intent: Intent, mode: UserMode): MoodboardCard {
  return {
    type: 'moodboard',
    title: 'Curated Moodboard',
    images: [
      '/mock-images/mood-1.jpg',
      '/mock-images/mood-2.jpg',
      '/mock-images/mood-3.jpg',
      '/mock-images/mood-4.jpg',
    ],
    moodKeywords: mode === 'home' 
      ? ['dreamy', 'inspiring', 'artistic', 'creative']
      : ['professional', 'modern', 'dynamic', 'engaging'],
  }
}

function generateVideoCard(intent: Intent, mode: UserMode): VideoCard {
  return {
    type: 'video',
    title: 'Video Concept',
    storyboard: [
      '/mock-images/video-frame-1.jpg',
      '/mock-images/video-frame-2.jpg',
      '/mock-images/video-frame-3.jpg',
    ],
    shotList: [
      'Wide shot establishing the scene',
      'Medium shot highlighting the subject',
      'Close-up for emotional impact',
    ],
    motionDescription: 'Smooth camera movements with cinematic transitions',
  }
}

function generateExperienceCard(intent: Intent, mode: UserMode): ExperienceCard {
  return {
    type: 'experience',
    title: 'Guided Journey',
    journey: [
      {
        title: 'Step 1: Discover',
        description: mode === 'home' ? 'Explore your creative potential' : 'Understand your market opportunity',
      },
      {
        title: 'Step 2: Develop',
        description: mode === 'home' ? 'Refine your vision' : 'Build your strategy',
      },
      {
        title: 'Step 3: Create',
        description: mode === 'home' ? 'Bring it to life' : 'Execute and measure',
      },
    ],
  }
}

// Main mock AI response generator
export async function generateMockResponse(
  userMessage: string,
  intent: Intent,
  mode: UserMode
): Promise<{ response: string; cardData?: CardData }> {
  // Simulate AI thinking time
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1500))

  // Get random response for this intent and mode
  const responses = MOCK_RESPONSES[intent][mode] || MOCK_RESPONSES.general[mode]
  const response = getRandomItem(responses)

  // Generate card data based on intent
  let cardData: CardData | undefined
// HOME MODE CUSTOM IMAGES

if (userMessage === 'Visualize a peaceful garden at sunset') {
  return {
    response: 'Here are your sunset garden concepts.',
    cardData: generateCustomImageCard(
      'Peaceful Garden',
      [
        '/home/garden-sunset-1.jpeg',
        '/home/garden-sunset-2.jpeg',
        '/home/garden-sunset-3.jpeg',
        '/home/garden-sunset-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Tell me an enchanting fairy tale') {
  return {
response:
  "I've crafted a magical fairy tale featuring memorable characters, a complete story arc and illustrated scene concepts. Explore each chapter below to follow Princess Elara's journey.",
    cardData: {
      type: 'story',

      title: 'The Moonlit Forest Princess',
      summary:
      'Princess Elara discovers a magical moonlit forest and joins a silver fox on a quest to recover a lost crystal that can save her kingdom from darkness.',
      characters: [
        'Princess Elara',
        'Silver Fox',
        'Moon Dragon',
        'Forest Spirits',
      ],

      moral:
        'Kindness and courage can overcome even the darkest challenges.',

      chapters: [
        {
          title: 'Chapter 1: The Whispering Forest',
          content:
            'Princess Elara discovered a glowing forest hidden beyond the kingdom.',
        },
        {
          title: 'Chapter 2: The Silver Fox',
          content:
            'A magical fox appeared and offered to guide her toward a lost moon crystal.',
        },
        {
          title: 'Chapter 3: The Moon Dragon',
          content:
            'Together they faced a mighty dragon guarding the crystal.',
        },
        {
          title: 'Chapter 4: The Kingdom Restored',
          content:
            'The crystal returned light to the kingdom and peace was restored.',
        },
      ],

      visuals: [
        '/home/fairy-scene-1.jpeg',
        '/home/fairy-scene-2.jpeg',
        '/home/fairy-scene-3.jpeg',
        '/home/fairy-scene-4.jpeg',
      ],
    } as any,
  }
}

if (userMessage === 'Design a minimalist poster concept') {
  return {
    response:
  "Here are four minimalist poster concepts based on your creative brief. I've explored different compositions, visual balance and artistic directions while keeping the design clean and modern.",
    cardData: generateCustomImageCard(
      'Poster Design',
      [
        '/home/minimalist-poster-1.jpeg',
        '/home/minimalist-poster-2.jpeg',
        '/home/minimalist-poster-3.jpeg',
        '/home/minimalist-poster-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Describe a mood with images and colors') {
  return {
    response:
    "I've curated a visual moodboard that captures the atmosphere, colors and creative direction behind your idea. Review the references below for inspiration.",
    cardData: generateCustomImageCard(
      'Moodboard',
      [
        '/home/moodboard-1.jpeg',
        '/home/moodboard-2.jpeg',
        '/home/moodboard-3.jpeg',
        '/home/moodboard-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Conceptualize a short film') {
  return {
    response:
`🎬 Short Film Concept

Genre: Psychological Thriller
Duration: 12 Minutes
Visual Style: Cinematic Noir
Target Audience: Young Adults

I've developed a complete short film concept with storyboard frames, visual direction and narrative structure. The scenes below represent the key moments of the film journey.`,

    cardData: generateCustomImageCard(
      'Short Film',
      [
        '/home/shortfilm-frame-1.jpeg',
        '/home/shortfilm-frame-2.jpeg',
        '/home/shortfilm-frame-3.jpeg',
        '/home/shortfilm-frame-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Plan an interactive experience') {
  return {
    response:
    "I've mapped out an interactive experience journey including audience touchpoints, engagement moments and immersive activities designed to create a memorable experience.",

    cardData: {
      type: 'experience',

      title: 'Immersive Discovery Journey',

      audience: 'Families, young adults and curious explorers',

      objective:
        'Create an emotionally engaging interactive experience that combines storytelling, exploration and participation.',

      journey: [
        {
          title: 'Arrival & Onboarding',
          description:
            'Visitors receive a personalized welcome and choose an experience path.',
        },
        {
          title: 'Interactive Exploration',
          description:
            'Guests interact with digital installations, touchpoints and guided activities.',
        },
        {
          title: 'Challenge & Participation',
          description:
            'Participants complete creative tasks and unlock achievements.',
        },
        {
          title: 'Reflection & Sharing',
          description:
            'Visitors generate personalized memories and share their journey.',
        },
      ],

      touchpoints: [
        'Interactive Screens',
        'AR Experiences',
        'Audio Storytelling',
        'Gamified Challenges',
        'Digital Rewards',
      ],

      outcome:
        'Visitors leave with a memorable personalized experience and shareable digital content.',

      visuals: [
        '/home/experience-1.jpeg',
        '/home/experience-2.jpeg',
        '/home/experience-3.jpeg',
        '/home/experience-4.jpeg',
      ],
    } as any,
  }
}

if (userMessage === 'Generate design inspiration') {
  return {
    response:
    "I've assembled a collection of design references and visual inspiration to help guide your creative process. Each concept explores a different aesthetic direction.",
    cardData: generateCustomImageCard(
      'Design Inspiration',
      [
        '/home/inspiration-1.jpeg',
        '/home/inspiration-2.jpeg',
        '/home/inspiration-3.jpeg',
        '/home/inspiration-4.jpeg',
      ]
    ),
  }
}
if (userMessage === 'Design a product launch campaign for Q3') {
  return {
    response: `Q3 PRODUCT LAUNCH STRATEGY

Campaign Theme: Work Smarter, Build Scalable
Target Audience: High-Velocity Teams & Technical Directors
Primary Objective: Accelerate feature awareness and platform user retention loops.

Core Channel Deliverables:
- Modular Instagram Content Framework
- Professional LinkedIn Performance Stack
- Dynamic Banner Ad Display Matrix
- Editorial Email Announcement Framework

I have compiled a comprehensive marketing campaign matrix with structured production-ready visual concepts and targeted messaging logs below.`,
    cardData: {
      type: 'campaign',
      title: 'Q3 Product Launch Strategy',
      copy: 'Work Smarter, Build Scalable — A premium enterprise launch matrix optimized for streamlined adoption layouts.',
      socialCaptions: [
        {
          platform: 'Instagram',
          caption: 'Architecting the core parameters for next-generation performance workflows. #DesignSystems',
        },
        {
          platform: 'LinkedIn',
          caption: 'Eliminate system bottlenecks and scale cross-functional pipelines smoothly. Read our development blueprint.',
        },
        {
          platform: 'Email',
          caption: 'Deployment complete. Access the architecture driving our latest interaction engine design updates.',
        },
      ],
      visuals: [
        '/business/q3-campaign-1.jpeg',
        '/business/q3-campaign-2.jpeg',
        '/business/q3-campaign-3.jpeg',
        '/business/q3-campaign-4.jpeg',
      ],
    } as any,
  }
}

if (userMessage === 'Create customer testimonial graphics') {
  return {
    response: `I've created a series of testimonial graphics designed to showcase customer success stories while maintaining a premium and trustworthy visual style.

    Highlights:
    • Customer Success Focus
    • Clean Visual Layouts
    • Premium Brand Presentation
    • Social Proof Ready`,
    
    cardData: generateCustomImageCard(
      'Social Proof Asset Blocks',
      [
        '/business/testimonial-1.jpeg',
        '/business/testimonial-2.jpeg',
        '/business/testimonial-3.jpeg',
        '/business/testimonial-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Create premium-looking product visuals') {
  return {
    response: `I've generated premium product photography concepts optimized for websites, social media and advertising campaigns.

    Style:
    • Luxury
    • Minimal
    • Clean Lighting
    
    Use Cases:
    • Website Hero Banner
    • Social Media
    • Product Advertising`,    cardData: generateCustomImageCard(
      'Premium Visual Components',
      [
        '/business/product-1.jpeg',
        '/business/product-2.jpeg',
        '/business/product-3.jpeg',
        '/business/product-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Design seasonal ambiance for evenings') {
  return {
    response: `I've created visual concepts for an evening atmosphere focused on warmth, comfort and premium customer experiences.

    Mood Keywords:
    • Warm
    • Elegant
    • Relaxed
    • Inviting`,
     cardData: generateCustomImageCard(
      'Atmospheric Ambiance Index',
      [
        '/business/ambiance-1.jpeg',
        '/business/ambiance-2.jpeg',
        '/business/ambiance-3.jpeg',
        '/business/ambiance-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Generate brand-themed artwork using our values and colors') {
  return {
    response: `I've created artwork concepts inspired by your brand identity, core values and color palette.

    Values:
    • Innovation
    • Trust
    • Creativity
    
    The concepts below are designed to feel consistent with your brand personality.`,
        cardData: generateCustomImageCard(
      'Brand Identity Layout Matrix',
      [
        '/business/brand-art-1.jpeg',
        '/business/brand-art-2.jpeg',
        '/business/brand-art-3.jpeg',
        '/business/brand-art-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Create an Apple-style product video concept') {
  return {
    response: `🎬 Product Video Concept

    Duration: 30 Seconds
    Style: Premium Minimalist
    Platform: Website + Social Media
    
    Storyboard:
    • Opening Hero Shot
    • Feature Showcase
    • Lifestyle Usage
    • Closing Brand Reveal
    
    I've developed a complete storyboard and cinematic product reveal sequence.`,
        cardData: generateCustomImageCard(
      'Cinematic Storyboard Sequence',
      [
        '/business/video-frame-1.jpeg',
        '/business/video-frame-2.jpeg',
        '/business/video-frame-3.jpeg',
        '/business/video-frame-4.jpeg',
      ]
    ),
  }
}

if (userMessage === 'Generate social media content ideas') {
  return {
    response: `📱 Social Media Content Package

    Content Ideas:
    • Instagram Reel
    • Customer Story
    • Behind The Scenes
    • Product Highlight
    
    Platforms:
    • Instagram
    • LinkedIn
    • Facebook
    
    I've developed a social media content package with visual concepts and platform-specific messaging.`,
       cardData: generateCustomImageCard(
      'Content Asset Distribution Array',
      [
        '/business/social-1.jpeg',
        '/business/social-2.jpeg',
        '/business/social-3.jpeg',
        '/business/social-4.jpeg',
      ]
    ),
  }
}

if (userMessage === "Create a sale poster that doesn't feel cheap") {
  return {
    response: `🏷️ Premium Sale Poster

    Design Notes:
    • Luxury Typography
    • Minimal Layout
    • Premium Color Palette
    • Strong Visual Hierarchy
    
    I've designed premium sale poster concepts that emphasize value and quality without relying on aggressive discount messaging.`,    cardData: generateCustomImageCard(
      'Premium Event Display Concepts',
      [
        '/business/poster-1.jpeg',
        '/business/poster-2.jpeg',
        '/business/poster-3.jpeg',
        '/business/poster-4.jpeg',
      ]
    ),
  }
}

const validPrompts = [
  ...HOME_STARTER_PROMPTS,
  ...BUSINESS_STARTER_PROMPTS,
]

if (!validPrompts.includes(userMessage)) {
  return {
    response:
      'Please use one of the suggested prompts below.',

    cardData: {
      type: 'generic',
      content: 'Available prompts',
      suggestions:
        mode === 'home'
          ? HOME_STARTER_PROMPTS
          : BUSINESS_STARTER_PROMPTS,
    } as any,
  }
}
  switch (intent) {
    case 'dream':
      cardData = generateImageCard(intent, mode)
      break
    
    case 'video':
      cardData = generateVideoCard(intent, mode)
          break
    case 'story':
      cardData = generateStoryCard(intent, mode)
      break
    case 'poster':
      cardData = generatePosterCard(intent, mode)
      break
    case 'campaign':
      cardData = generateCampaignCard(intent, mode)
      break
    case 'moodboard':
      cardData = generateMoodboardCard(intent, mode)
      break
    case 'experience':
      cardData = generateExperienceCard(intent, mode)
      break
    default:
      break
  }

  return { response, cardData }
}
