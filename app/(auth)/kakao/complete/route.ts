import db from '@/lib/db';
import { fetchAccessToken, fetchUserProfile } from '@/lib/oauth';
import { handleUserSession } from '@/lib/userSessionHandler';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const host = request.nextUrl.origin;
  if (!code) {
    return new Response(null, { status: 400 });
  }

  const { error, access_token } = await fetchAccessToken(
    'https://kauth.kakao.com/oauth/token',
    {
      client_id: process.env.KAKAO_CLIENT_ID!,
      client_secret: process.env.KAKAO_CLIENT_SECRET!,
      redirect_uri: `${host}/kakao/complete`,
      grant_type: 'authorization_code',
      code
    }
  );

  if (error) {
    return new Response(null, { status: 400 });
  }

  const {
    id,
    properties: { nickname, profile_image }
  } = await fetchUserProfile(
    'https://kapi.kakao.com/v2/user/me',
    access_token,
    { 'Content-type': 'application/x-www-form-urlencoded' }
  );

  const user = await db.user.findUnique({
    where: {
      kakao_id: String(id)
    },
    select: {
      id: true
    }
  });
  if (user) {
    await handleUserSession(user.id);
    redirect('/profile');
  } else {
    const newUser = await db.user.findUnique({
      where: {
        username: nickname
      },
      select: {
        id: true
      }
    });
    if (newUser) {
      const newUsernameUser = await db.user.create({
        data: {
          kakao_id: String(id),
          username: `${nickname}_카카오`,
          avatar: profile_image
        },
        select: {
          id: true
        }
      });
      await handleUserSession(newUsernameUser.id);
      redirect('/profile');
    } else {
      const correctUser = await db.user.create({
        data: {
          kakao_id: String(id),
          username: nickname,
          avatar: profile_image
        },
        select: {
          id: true
        }
      });
      await handleUserSession(correctUser.id);
      redirect('/profile');
    }
  }
}
