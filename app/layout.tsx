import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { fetchMasterData } from '@/app/_lib/fetcher'
import { JotaiMasterDataProvider } from '@/app/_atoms/JotaiMasterDataProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '決済管理システム',
  description: '決済管理システム',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const masterData = await fetchMasterData()
  
  return (
    <html lang='ja'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <JotaiMasterDataProvider initialMasterData={masterData}>
          {children}
        </JotaiMasterDataProvider>
      </body>
    </html>
  )
}
