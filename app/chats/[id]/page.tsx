import ChatMessagesList from '@/components/chat-messages-list';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { Prisma } from '@prisma/client';
import { unstable_cache } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

const getChat = async (id: string) => {
  const room = await db.chatRoom.findUnique({
    where: {
      id
    },
    include: {
      users: {
        select: { id: true }
      },
      product: {
        select: {
          buyerId: true,
          id: true,
          userId: true
        }
      }
    }
  });
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find(user => user.id === session.id));
    if (!canSee) {
      return null;
    }
  }
  return room;
};

const getMessages = async (id: string) => {
  const messages = await db.message.findMany({
    where: {
      chatRoomId: id
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true
        }
      }
    }
  });
  return messages;
};

const getUserProfile = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id
    },
    select: {
      username: true,
      avatar: true
    }
  });
  return user;
};

const getCachedUserProfile = unstable_cache(getUserProfile, ['user-profile'], {
  tags: ['user-profile']
});

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function Chats({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const room = await getChat(id);
  if (!room) {
    return notFound();
  }
  const initialChatMessages = await getMessages(id);
  const session = await getSession();

  const user = await getCachedUserProfile(session.id!);
  if (!user) {
    return notFound();
  }
  const participants = room.users.some(user => user.id === session.id);
  const buyerId = room.product?.buyerId || null;

  const product = room.product;
  const isTransactionComplete = Boolean(product?.buyerId);

  let hasReviewed = false;
  if (isTransactionComplete) {
    let review;
    if (session.id === product!.userId) {
      // 현재 사용자가 판매자이면, 리뷰 대상은 구매자 → reviewee = product.buyerId
      review = await db.review.findFirst({
        where: { productId: product!.id, revieweeId: product!.buyerId! }
      });
    } else {
      // 현재 사용자가 구매자이면, 리뷰 대상은 판매자 → reviewee = product.userId
      review = await db.review.findFirst({
        where: { productId: product!.id, revieweeId: product!.userId }
      });
    }
    hasReviewed = Boolean(review);
  }
  // const deleteRoom = async () => {
  //   'use server';
  //   await db.chatRoom.delete({
  //     where: {
  //       id: room.id
  //     }
  //   });
  //   redirect('/chats');
  // };
  return (
    <div>
      {/* <form action={deleteRoom} className="absolute left-0">
        {participants && <button>나가기</button>}
      </form> */}
      <ChatMessagesList
        username={user.username}
        avatar={user.avatar!}
        chatRoomId={id}
        initialChatMessages={initialChatMessages}
        userId={session.id!}
        buyerId={buyerId}
        hasReviewed={hasReviewed}
      />
    </div>
  );
}
