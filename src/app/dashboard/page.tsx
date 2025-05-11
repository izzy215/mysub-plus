'use client';

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">대시보드</h2>
      <p>로그인 성공! 🎉</p>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        로그아웃
      </button>
    </div>
  );
}
