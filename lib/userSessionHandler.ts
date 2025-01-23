import { redirect } from 'next/navigation';
import getSession from './session';

export async function handleUserSession(userId: number) {
  const session = await getSession();
  session.id = userId;
  await session.save();
  return redirect('/profile');
}
