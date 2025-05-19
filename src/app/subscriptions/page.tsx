'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import SubscriptionModal from '@/components/SubscriptionModal';

interface Subscription {
    id: number;
    name: string;
    price: number;
  }
export default function SubscriptionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

    // 구독추가
    const handleAddSubscription = (name: string, price: number) => {
    const newSubscription = {
        id: subscriptions.length + 1,
        name,
        price,
      };
    setSubscriptions([...subscriptions, newSubscription]);
    };

    //구독 수정
    const handleUpdateSubscription = (name: string, price: number) => {
      if (!selectedSub) return;
  
      const updatedSubscriptions = subscriptions.map((sub) =>
        sub.id === selectedSub.id ? { ...sub, name, price } : sub
      );
  
      setSubscriptions(updatedSubscriptions);
      setSelectedSub(null);
      setIsModalOpen(false);
    };
  
    //구독수정 클릭시 모달창 오픈
    const handleEditClick = (sub: Subscription) => {
      setSelectedSub(sub);
      setIsModalOpen(true);
    };
    

    const [subscriptions, setSubscriptions] = useState<Subscription[]>([
        { id: 1, name: '넷플릭스', price: 9500 },
        { id: 2, name: '스포티파이', price: 10000 },
        { id: 3, name: '디즈니+', price: 7900 },
      ]);

  //구독삭제
  const handleDelete = (id: number) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">내 구독 관리</h2>

        {/* 구독 목록 */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">구독 서비스 목록</h3>
          <ul className="space-y-3">
          {subscriptions.map((sub) => (
              <li key={sub.id} className="border-b py-2 flex justify-between">
                <span>{sub.name}</span>
                <span>₩{sub.price.toLocaleString()}</span>
                <button
                    onClick={() => handleEditClick(sub)}
                    className="mr-2 text-blue-500"
                  >
                    수정
                </button>
                <button
                  onClick={() => handleDelete(sub.id)}
                  className="ml-4 text-red-500"
                >
                  삭제
                </button>
              </li>
            ))}
            {/* <li className="border-b py-2 flex justify-between">
              <span>넷플릭스</span>
              <span>₩9,500</span>
            </li>
            <li className="border-b py-2 flex justify-between">
              <span>스포티파이</span>
              <span>₩10,000</span>
            </li>
            <li className="border-b py-2 flex justify-between">
              <span>디즈니+</span>
              <span>₩7,900</span>
            </li> */}
          </ul>

          {/* 구독 추가 버튼 */}
          <div className="mt-6 text-center">
            <button
                onClick={() => {
                  setIsModalOpen(true)
                  setSelectedSub(null)
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                구독 추가하기
            </button>
            </div>

            {/* 조건부 렌더링  */}
            {isModalOpen && (
            <SubscriptionModal
                onClose={() => setIsModalOpen(false)}
                onSave={selectedSub ? handleUpdateSubscription : handleAddSubscription}
                initialName={selectedSub?.name}
                initialPrice={selectedSub?.price}
            />
            )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
