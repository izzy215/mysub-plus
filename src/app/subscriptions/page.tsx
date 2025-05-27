'use client';

import { db } from '@/lib/firebase';
import { addDoc, collection, updateDoc , deleteDoc, doc, onSnapshot , query, where } from 'firebase/firestore';
import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import SubscriptionModal from '@/components/SubscriptionModal';
import SubscriptionCarousel from '@/components/SubscriptionCarousel';


interface Subscription {
    id: string;
    name: string;
    price: number;
  }
export default function SubscriptionsPage() {
    const { logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  // Firestore에서 구독 목록 실시간 불러오기
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'subscriptions'),
      where('uid', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Subscription[];

      setSubscriptions(data);
    });

    console.log('unsubscribe',unsubscribe)

    return () => unsubscribe(); // cleanup
  }, []);

    // 구독추가
    const handleAddSubscription = async (name: string, price: number) => {
      const user = auth.currentUser;
      if(!user) return;

      await addDoc(collection(db, 'subscriptions'), {
        uid: user.uid,
        name,
        price,
        createAt: new Date(),
      })

       
    };

    //구독 수정
    const handleUpdateSubscription = async (name: string, price: number) => {
      if (!selectedSub) return;
  
      const docRef = doc(db, 'subscriptions', selectedSub.id);
      await updateDoc(docRef, {
        name,
        price,
      });

      setSelectedSub(null);
      setIsModalOpen(false);
    };
  
    //구독수정 클릭시 모달창 오픈
    const handleEditClick = (sub: Subscription) => {
      setSelectedSub(sub);
      setIsModalOpen(true);
    };
    

    // const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    //     { id: 1, name: '넷플릭스', price: 9500 },
    //     { id: 2, name: '스포티파이', price: 10000 },
    //     { id: 3, name: '디즈니+', price: 7900 },
    //   ]);

  //구독삭제
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'subscriptions', id));
  };
  

  return (
    <ProtectedRoute>
      <div className="flex justify-end gap-4 mb-4">
        <Link href="/dashboard">
          <button
            className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200"
          >
            대시보드
          </button>
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
        >
          로그아웃
        </button>
      </div>  
       
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


      {/* 구독 리스트 아래에 추가 */}
      <SubscriptionCarousel />

    </ProtectedRoute>
  );
}
