'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

export default async function saveMessages(
  payload: string,
  chatRoomId: string
) {
  const session = await getSession();
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!
    },
    select: {
      id: true
    }
  });
}

export async function completeTransaction(formData: FormData) {
  const chatRoomId = formData.get('chatRoomId')?.toString();
  const session = await getSession();

  const chatRoom = await db.chatRoom.findUnique({
    where: {
      id: chatRoomId
    },
    include: {
      product: true,
      users: true
    }
  });

  if (!chatRoom || !chatRoom.product) {
    return notFound();
  }

  const product = chatRoom.product;
  let buyerId: number;
  if (session.id !== product.userId) {
    buyerId = session.id!;
  } else {
    const otherUser = chatRoom.users.find(user => user.id !== product.userId);
    buyerId = otherUser!.id;
  }

  await db.product.update({
    where: {
      id: product.id
    },
    data: {
      buyerId
    }
  });

  const revieweeId =
    product.userId === session.id
      ? chatRoom.users.find(u => u.id !== product.userId)?.id
      : product.userId;

  redirect(`/reviews/new?revieweeId=${revieweeId}&productId=${product.id}`);
}

export async function goToReviewPage(formData: FormData) {
  const chatRoomId = formData.get('chatRoomId')?.toString();
  if (!chatRoomId) return;

  const session = await getSession();
  if (!session?.id) return;

  const room = await db.chatRoom.findUnique({
    where: { id: chatRoomId },
    include: { product: true, users: true }
  });
  if (!room || !room.product) return;

  const product = room.product;
  let revieweeId: number | null = null;
  if (session.id === product.userId) {
    revieweeId = product.buyerId || null;
  } else {
    revieweeId = product.userId;
  }
  if (!revieweeId) {
    return;
  }
  redirect(`/reviews/new?revieweeId=${revieweeId}&productId=${product.id}`);
}
