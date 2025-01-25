'use client';

import Link from 'next/link';
import { IoHome } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { RiWechat2Fill } from 'react-icons/ri';
import { RiWechat2Line } from 'react-icons/ri';
import { IoNewspaperSharp } from 'react-icons/io5';
import { IoNewspaperOutline } from 'react-icons/io5';
import { IoIosVideocam } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-md mx-auto grid grid-cols-5 border-neutral-600 border-t ">
      <Link
        href={'/products'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3 ">
        {pathname === '/products' ? (
          <>
            <IoHome className="size-7" />
            <span className="text-neutral-200">홈</span>
          </>
        ) : (
          <>
            <IoHomeOutline className="size-7" />
            <span className="text-neutral-400">홈</span>
          </>
        )}
      </Link>
      <Link
        href={'/life'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/life' ? (
          <>
            <IoNewspaperSharp className="size-7" />
            <span className="text-neutral-200">이모저모</span>
          </>
        ) : (
          <>
            <IoNewspaperOutline className="size-7" />
            <span className="text-neutral-400">이모저모</span>
          </>
        )}
      </Link>
      <Link
        href={'/chats'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/chats' ? (
          <>
            <RiWechat2Fill className="size-7" />
            <span className="text-neutral-200">채팅</span>
          </>
        ) : (
          <>
            <RiWechat2Line className="size-7" />
            <span className="text-neutral-400">채팅</span>
          </>
        )}
      </Link>
      <Link
        href={'/live'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/live' ? (
          <>
            <IoIosVideocam className="size-7" />
            <span className="text-neutral-200">라이브</span>
          </>
        ) : (
          <>
            <IoVideocamOutline className="size-7" />
            <span className="text-neutral-400">라이브</span>
          </>
        )}
      </Link>
      <Link
        href={'/profile'}
        className="flex flex-col items-center justify-center gap-2 text-sm text-neutral-400 py-3">
        {pathname === '/profile' ? (
          <>
            <FaUser className="size-7" />
            <span className="text-neutral-200">나의 다락방</span>
          </>
        ) : (
          <>
            <FaRegUser className="size-7" />
            <span className="text-neutral-400">나의 다락방</span>
          </>
        )}
      </Link>
    </div>
  );
}
