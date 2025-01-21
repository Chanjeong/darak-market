import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionProps {
  id?: number;
}

export default async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionProps>(cookieStore, {
    cookieName: 'choco-cookie',
    password: process.env.COOKIE_PASSWORD!
  });
}
