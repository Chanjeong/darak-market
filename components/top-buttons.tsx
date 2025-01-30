'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopButtons() {
  const pathname = usePathname();
  return (
    <div className="flex gap-5 p-5 border-b border-neutral-600">
      {pathname === '/products' ? (
        <Link
          href="/products"
          className="rounded-full p-3 ring-2 ring-neutral-600 text-black bg-neutral-600">
          중고거래
        </Link>
      ) : (
        <Link
          href="/products"
          className="rounded-full p-3 ring-2 ring-neutral-600 text-white">
          중고거래
        </Link>
      )}

      {pathname === '/rentals' ? (
        <Link
          href="/rentals"
          className="rounded-full p-3 ring-2 ring-neutral-600 text-black bg-neutral-600">
          단기렌탈
        </Link>
      ) : (
        <Link
          href="/rentals"
          className="rounded-full p-3 ring-2 ring-neutral-600 text-white">
          단기렌탈
        </Link>
      )}
    </div>
  );
}
