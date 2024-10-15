import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Fiston - Portfolio',
    template: '%s | Fiston - Portfolio',
  },
  description: 'Software developer portfolio showcasing projects and blog posts',
  keywords: ['software developer', 'portfolio', 'projects', 'blog'],
  authors: [{ name: 'Fiston' }],
  creator: 'Fiston',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
    siteName: 'Fiston - Portfolio',
    images: [
      {
        url: 'https://your-portfolio-url.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fiston - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@your_twitter_handle',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
