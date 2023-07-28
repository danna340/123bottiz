import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/components/Modal-provider'
import { ToaterProvider } from '@/components/ToaterProvider'
import { CrispProvider } from '@/components/CrispProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '123bottiz',
  description: 'AI Assistant Bots',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Main Authentication with Clerk for wrapping all APP
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={inter.className}>
          <ModalProvider />
          <ToaterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
