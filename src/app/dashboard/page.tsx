'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

interface Subscription {
  id: number;
  name: string;
  price: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardPage() {
  const { logout } = useAuth();

  // 예제 데이터 (실제 데이터는 구독 페이지에서 가져올 예정)
  const [subscriptions] = useState<Subscription[]>([
    { id: 1, name: '넷플릭스', price: 9500 },
    { id: 2, name: '스포티파이', price: 10000 },
    { id: 3, name: '디즈니+', price: 7900 },
  ]);

  // 차트 데이터로 변환
  const chartData = subscriptions.map((sub) => ({
    name: sub.name,
    value: sub.price,
  }));

  return (
    <ProtectedRoute>  
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-6">대시보드</h2>
        <p className="mb-4">로그인 성공! 🎉</p>

        {/* 구독 요약 차트 */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-4">월 구독 요약</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        
        <div className="flex justify-center gap-4 mt-4">
                {/* 구독 관리 페이지 이동 버튼 */}
        <Link href="/subscriptions">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            내 구독 관리
          </button>
        </Link>

              {/* 로그아웃 버튼 */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>
       
       
      </div>
    </ProtectedRoute>
  );
}
