'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };
  return (
    <button onClick={onClose}>
      <XMarkIcon className="size-6" />
    </button>
  );
}

export function ViewDetailButton() {
  const handleDetailsClick = () => {
    window.location.reload();
  };

  return (
    <div>
      <button
        onClick={handleDetailsClick}
        className="bg-amber-900 text-white p-3 rounded-lg hover:bg-amber-800 transition sm:p-px sm:text-xs">
        자세히 보기
      </button>
    </div>
  );
}
