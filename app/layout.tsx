import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import { fetchMasterData } from '@/app/_lib/fetcher'
import { JotaiMasterDataProvider } from '@/app/_atoms/JotaiMasterDataProvider'
import { CsrfTokenSetter } from '@/app/_components/CsrfTokenSetter'

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
      <body
        className={`${notoSans.variable} antialiased min-h-screen`}
      >
        <CsrfTokenSetter />
        <JotaiMasterDataProvider initialMasterData={masterData}>
          {children}
        </JotaiMasterDataProvider>
      </body>
    </html>
  )
}
