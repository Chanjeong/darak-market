// /app/add/page.tsx
import Link from 'next/link';
import { IoCubeOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export default function Add() {
  return (
    <div className="min-h-screen bg-stone-900 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">추가하기</h1>
      <div className="flex flex-col gap-8 w-full max-w-2xl">
        <Link href="/products/add">
          <div className="card card-bordered bg-amber-800 text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="flex-shrink-0">
                <IoCubeOutline className="text-4xl text-amber-500" />
              </div>
              <div className="ml-4">
                <h2 className="card-title text-2xl font-semibold">
                  제품 추가하기
                </h2>
                <p className="text-gray-300">
                  새로운 제품을 등록하고 판매 기회를 넓혀보세요.
                </p>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/posts/add">
          <div className="card card-bordered bg-amber-800 text-white shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer">
            <div className="card-body flex flex-row items-center">
              <div className="flex-shrink-0">
                <IoChatbubbleEllipsesOutline className="text-4xl text-amber-500" />
              </div>
              <div className="ml-4">
                <h2 className="card-title text-2xl font-semibold">
                  이모저모 추가하기
                </h2>
                <p className="text-gray-300">
                  커뮤니티에 새로운 소식이나 정보를 공유해보세요.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
