import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTime } from '@/lib/utils';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const getChats = async (id: number) => {
  const chats = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: id
        }
      }
    },
    include: {
      messages: {
        select: {
          id: true,
          payload: true,
          created_at: true
        },
        orderBy: {
          created_at: 'desc'
        }
      },
      users: {
        select: {
          id: true,
          username: true,
          avatar: true
        }
      }
    }
  });
  return chats;
};

export const metadata = {
  title: '채팅방'
};

export default async function Chats() {
  const session = await getSession();
  const chats = await getChats(session.id!);

  return (
    <div>
      <p className="p-5 text-3xl font-bold">채팅</p>
      {chats.map(chat => (
        <Link href={`/chats/${chat.id}`} key={chat.id}>
          <div className="p-5 flex gap-5 w-full">
            <div className="flex gap-5 w-full">
              <div className="flex items-center">
                {chat.users.map(user => {
                  return (
                    <>
                      <div
                        key={user.id}
                        className="relative size-8 rounded-full overflow-hidden">
                        <Image src={user.avatar!} alt={user.username} fill />
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="flex flex-col gap-px w-full">
                <div className="flex">
                  {chat.users.map(user => {
                    return (
                      <div
                        key={user.id}
                        className="font-semibold">{`${user.username},`}</div>
                    );
                  })}
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="text-neutral-400 ">
                    {chat.messages.length > 0
                      ? chat.messages[0].payload
                      : '메시지가 없습니다.'}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {formatToTime(chat.created_at.toString())}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
