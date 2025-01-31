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
