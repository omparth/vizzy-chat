import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Vizzy Chat - AI Creative Assistant',
  description:
    'Create stunning visuals, stories, campaigns and creative experiences with Vizzy Chat.',
  applicationName: 'Vizzy Chat',

}
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
    lang="en"
    suppressHydrationWarning
    className={`${inter.variable} ${geistMono.variable}`}
  >
    <body className="font-sans antialiased bg-background text-foreground">
      
      <ThemeProvider>
        {children}
      </ThemeProvider>
  
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </body>
  </html>
  )
}
