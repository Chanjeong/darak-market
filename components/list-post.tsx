import { formatToTime, formatToWon } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

interface ListPostProps {
  id: number;
  title: string;
  description: string | null;
  views: number;
  created_at: Date;
  _count: {
    comments: number;
    likes: number;
  };
}

export default function ListPost({
  id,
  title,
  views,
  description,
  created_at,
  _count: { comments, likes }
}: ListPostProps) {
  return (
    <Link
      key={id}
      href={`/posts/${id}`}
      className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0">
      <h2 className="text-white text-lg font-semibold">{title}</h2>
      <p>{description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4 items-center">
          <span>{formatToTime(created_at.toString())}</span>
          <span>·</span>
          <span>조회 {views}</span>
        </div>
        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
          <span>
            <HandThumbUpIcon className="size-4" />
            {likes}
          </span>
          <span>
            <ChatBubbleBottomCenterIcon className="size-4" />
            {comments}
          </span>
        </div>
      </div>
    </Link>
  );
}
