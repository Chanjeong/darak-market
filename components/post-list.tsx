'use client';

import { useEffect, useRef, useState } from 'react';
import ListPost from './list-post';
import { fetchPostPage } from '@/app/(tabs)/life/fetchPosts';
import { InitialPosts } from '@/app/(tabs)/life/page';

interface InitialPostsProps {
  initialPosts: InitialPosts;
}

export function PostList({ initialPosts }: InitialPostsProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          const newPosts = await fetchPostPage(page + 1);
          if (newPosts.length !== 0) {
            setPage(prev => prev + 1);
            setPosts(prev => [...prev, ...newPosts]);
          }
        }
      },
      {
        threshold: 1.0
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {posts.map(post => (
        <ListPost key={post.id} {...post} />
      ))}
      <span ref={trigger} className=""></span>
    </div>
  );
}
