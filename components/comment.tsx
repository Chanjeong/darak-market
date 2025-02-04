import { formatToTime } from '@/lib/utils';
import Image from 'next/image';

interface CommentProps {
  comment: {
    id: number;
    payload: string;
    created_at: Date;
    user: {
      avatar: string | null;
      username: string;
    };
  };
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div>
      <div key={comment.id} className="flex gap-5">
        <div className="rounded-full overflow-hidden relative size-8">
          <Image fill src={comment.user.avatar!} alt={comment.user.username} />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div className="text-sm font-semibold">{comment.user.username}</div>
            <div className="text-xs text-neutral-400">
              {formatToTime(comment.created_at.toString())}
            </div>
          </div>
          <div>
            <div>{comment.payload}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
