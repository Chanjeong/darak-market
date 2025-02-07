'use client';

import saveMessages from '@/app/(tabs)/chats/saveMessage';
import { InitialChatMessages } from '@/app/chats/[id]/page';
import { formatToTime } from '@/lib/utils';
import { ArrowUpCircleIcon } from '@heroicons/react/24/solid';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ChatMessagesListProps {
  initialChatMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

console.log(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY);

export default function ChatMessagesList({
  initialChatMessages,
  userId,
  chatRoomId,
  username,
  avatar
}: ChatMessagesListProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialChatMessages);
  const channel = useRef<RealtimeChannel>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newMsg = {
      id: Date.now(),
      payload: message,
      created_at: new Date(),
      userId,
      user: {
        username,
        avatar
      }
    };

    setMessages(prev => [...prev, newMsg]);

    channel.current?.send({
      type: 'broadcast',
      event: 'message',
      payload: newMsg
    });

    await saveMessages(message, chatRoomId);
    setMessage('');
  };

  useEffect(() => {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!
    );
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on('broadcast', { event: 'message' }, payload => {
        setMessages(prev => [...prev, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className="p-5 flex flex-col gap-5 min-h-screen justify-end ">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`chat ${msg.userId === userId ? 'chat-end' : 'chat-start'}`}>
          {msg.userId !== userId && (
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Image
                  src={msg.user.avatar!}
                  alt={msg.user.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
          )}
          <div
            className={`chat-bubble ${msg.userId === userId ? 'bg-amber-600' : 'bg-neutral-600'} text-white`}>
            {msg.payload}
          </div>
          <div className="chat-footer text-xs text-gray-300">
            {formatToTime(msg.created_at.toString())}
          </div>
        </div>
      ))}
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          type="text"
          name="message"
          placeholder="메세지 보내기"
          className="input input-bordered w-full pr-16 bg-stone-800 text-white placeholder:text-gray-400"
        />
        <button className="btn btn-ghost absolute right-0" type="submit">
          <ArrowUpCircleIcon className="w-8 h-8 text-amber-900 transition-colors hover:text-amber-800" />
        </button>
      </form>
    </div>
  );
}
