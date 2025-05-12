'use client';

import { useState } from 'react';

interface SubscriptionModalProps {
  onClose: () => void;
  onSave: (name: string, price: number) => void;
}

export default function SubscriptionModal({ onClose, onSave }: SubscriptionModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    onSave(name, parseInt(price));
    setName('');
    setPrice('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h3 className="text-lg font-bold mb-4">구독 추가하기</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">서비스명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm">가격 (₩)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="text-red-500">취소</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">저장</button>
          </div>
        </form>
      </div>
    </div>
  );
}
