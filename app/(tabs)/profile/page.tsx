import EditUsername from '@/components/editUsername';
import db from '@/lib/db';
import getSession from '@/lib/session';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = db.user.findUnique({
      where: {
        id: session.id
      }
    });
    return user;
  }
  notFound();
};

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };

  const deleteUser = async () => {
    'use server';
    const session = await getSession();
    await db.user.delete({
      where: {
        id: session.id
      }
    });
    session.destroy();
    redirect('/');
  };

  return (
    <div className="flex items-center justify-center pt-10">
      <div className="flex flex-col items-center gap-6 bg-neutral-800 border border-amber-500 px-12 py-10 rounded-lg shadow-lg">
        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-800">
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt={user.username}
              fill
              className="object-cover"
            />
          )}
        </div>
        <EditUsername initialUsername={user!.username} />
        <div className="flex flex-col gap-3 w-full">
          {user?.password ? (
            <Link
              href="profile/password"
              className="block text-center py-2 px-4 text-white  bg-amber-800 rounded hover:bg-amber-700 transition">
              비밀번호 변경
            </Link>
          ) : (
            ''
          )}
          <Link
            href="/profile/reviews"
            className="block text-center py-2 px-4 text-white  bg-amber-800 rounded hover:bg-amber-700 transition">
            내가 받은 리뷰
          </Link>
          <Link
            href="/profile/buy"
            className="block text-center py-2 px-4 text-white bg-amber-800 rounded hover:bg-amber-700 transition">
            내가 산 품목
          </Link>
          <Link
            href="/profile/sell"
            className="block text-center py-2 px-4 text-white bg-amber-800 rounded hover:bg-amber-700 transition">
            내가 판 품목
          </Link>
        </div>
        <div className="flex gap-4 mt-4">
          <form action={logOut}>
            <button
              type="submit"
              className="py-2 px-6 bg-amber-800 rounded hover:bg-amber-500 transition">
              로그아웃
            </button>
          </form>
          <form action={deleteUser}>
            <button
              type="button"
              className="py-2 px-6 bg-red-600 rounded hover:bg-red-500 transition">
              회원탈퇴
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
