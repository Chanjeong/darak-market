import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const baseURL = 'https://nid.naver.com/oauth2.0/authorize';
  const host = request.nextUrl.origin;
  const params = {
    client_id: process.env.NAVER_CLIENT_ID!,
    response_type: 'code',
    redirect_url: `${host}/naver/complete`,
    state: process.env.NAVER_STATE!
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
