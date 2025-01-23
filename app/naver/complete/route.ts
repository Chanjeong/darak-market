import db from '@/lib/db';
import { handleUserSession } from '@/lib/userSessionHandler';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state')!;

  if (!code) {
    notFound();
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.NAVER_CLIENT_ID!,
    client_secret: process.env.NAVER_CLIENT_SECRET!,
    grant_type: 'authorization_code',
    code,
    state
  }).toString();
  const { error, access_token } = await (
    await fetch(`https://nid.naver.com/oauth2.0/token?${accessTokenParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  ).json();

  if (error) {
    return new Response(null, { status: 400 });
  }

  const {
    response: { id, profile_image, name }
  } = await (
    await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cache: 'no-cache'
    })
  ).json();

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
    }
  }
}
