import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  const host = request.nextUrl.origin;

  const params = {
    client_id: process.env.KAKAO_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: `${host}/kakao/complete`
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
