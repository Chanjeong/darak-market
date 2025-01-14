import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <div className="my-auto flex flex-col items-center">
        <span className="text-9xl">🥖</span>
        <h1 className="text-4xl font-bold">다락</h1>
        <h2 className="text-2xl">다락 마켓에 어서오세요!</h2>
      </div>
      <div className="w-full flex flex-col items-center gap-3 *:font-medium p-4">
        <Link href="/create-account" className="primary-btn py-2.5">
          시작하기
        </Link>
        <div className="flex gap-1">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
