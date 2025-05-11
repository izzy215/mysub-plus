// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import { AuthProvider } from '@/context/AuthContext' // 이 줄 추가!

export const metadata = {
  title: 'MySubs+',
  description: '구독 서비스 관리 플랫폼',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <AuthProvider> {/* 인증 상태 감싸기 */}
          <header className="w-full py-4 bg-white shadow text-center">
            <h1 className="text-xl font-bold">MySubs+</h1>
          </header>
          <main className="p-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
