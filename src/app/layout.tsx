// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'MySubs+',
  description: '구독 서비스 관리 플랫폼',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="w-full py-4 bg-white shadow text-center">
          <h1 className="text-xl font-bold">MySubs+</h1>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
