import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          href="/naver/start"
          className="bg-green-600 text-white rounded-md h-10 gap-2 flex items-center justify-center">
          <span>
            <SiNaver className="size-5" />
          </span>
          <span>네이버로 로그인하기</span>
        </Link>
        <Link
          href="/kakao/start"
          className="bg-yellow-400 text-black rounded-md h-10 gap-2 flex items-center justify-center">
          <span>
            <RiKakaoTalkFill className="size-5" />
          </span>
          <span>카카오로 로그인하기</span>
        </Link>
        <Link
          href="/email"
          className="primary-btn h-10 gap-2 flex items-center justify-center">
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-5" />
          </span>
          <span>SMS로 로그인하기</span>
        </Link>
      </div>
    </>
  );
}
