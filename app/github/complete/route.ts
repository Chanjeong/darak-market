import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return notFound();
  }

  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const { error, access_token } = await (
    await fetch(accessTokenURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      }
    })
  ).json();
  if (error) {
    return new Response(null, {
      status: 400
    });
  }
  const { login, id, avatar_url } = await (
    await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cache: 'no-cache'
    })
  ).json();

  const user = await db.user.findUnique({
    where: {
      github_id: String(id)
    },
    select: {
      id: true
    }
  });
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect('/profile');
  } else {
    const newUser = await db.user.create({
      data: {
        github_id: String(id),
        username: login,
        avatar: avatar_url
      },
      select: {
        id: true
      }
    });
    const session = await getSession();
    session.id = newUser.id;
    await session.save();
    return redirect('/profile');
  }
}
