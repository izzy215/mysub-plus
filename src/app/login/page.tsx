// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext' 

export default function LoginPage() {
  // 이메일 상태
  const [email, setEmail] = useState('');
  //비밀번호 상태
  const [password, setPassword] = useState('');

  const { login } = useAuth(); // 훅으로 login 가져오기

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('로그인 시도:', email, password);
    // 실제 로그인 처리 로직은 나중에 추가
    login(email, password); // 로그인 상태로 변경 + /dashboard 리디렉션
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">로그인</h2>

        <div>
          <label className="block text-sm font-medium mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          로그인
        </button>
      </form>
    </main>
  );
}