'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">대시보드</h2>
        <p>로그인 성공! 🎉</p>

        <div className="mt-4">
          <Link href="/subscriptions">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              내 구독 관리
            </button>
          </Link>
        </div>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          로그아웃
        </button>
      </div>
    </ProtectedRoute>
  );
}
