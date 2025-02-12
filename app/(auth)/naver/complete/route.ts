import db from '@/lib/db';
import { fetchAccessToken, fetchUserProfile } from '@/lib/oauth';
import { handleUserSession } from '@/lib/userSessionHandler';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state')!;
  const host = request.nextUrl.origin;

  if (!code) {
    return new Response(null, { status: 400 });
  }
  const { error, access_token } = await fetchAccessToken(
    'https://nid.naver.com/oauth2.0/token',
    {
      client_id: process.env.NAVER_CLIENT_ID!,
      client_secret: process.env.NAVER_CLIENT_SECRET!,
      redirect_uri: `${host}/naver/complete`,
      grant_type: 'authorization_code',
      code,
      state
    }
  );

  if (error) {
    return new Response(null, { status: 400 });
  }

  const {
    response: { id, profile_image, name }
  } = await fetchUserProfile(
    'https://openapi.naver.com/v1/nid/me',
    access_token
  );

  const user = await db.user.findUnique({
    where: {
      naver_id: id
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
        username: name
      },
      select: {
        id: true
      }
    });
    if (newUser) {
      const newUsernameUser = await db.user.create({
        data: {
          naver_id: id,
          username: `${name}_네이버`,
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
          naver_id: id,
          username: name,
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
