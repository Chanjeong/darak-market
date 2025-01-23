import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  const params = {
    client_id: process.env.KAKAO_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: process.env.KAKAO_REDIRECT_URL!
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
