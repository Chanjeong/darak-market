import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          href="/github/start"
          className="primary-btn h-10 gap-2 flex items-center justify-center">
          <span>
            <FaGithub className="size-5" />
          </span>
          <span>Signup with Github</span>
        </Link>
        <Link
          href="/sms"
          className="primary-btn h-10 gap-2 flex items-center justify-center">
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className="size-5" />
          </span>
          <span>Signup with the SMS</span>
        </Link>
      </div>
    </>
  );
}
