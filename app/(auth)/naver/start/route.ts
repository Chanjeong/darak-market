import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://nid.naver.com/oauth2.0/authorize';
  const params = {
    client_id: process.env.NAVER_CLIENT_ID!,
    response_type: 'code',
    redirect_url: process.env.NAVER_REDIRECT_URL!,
    state: process.env.NAVER_STATE!
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  return redirect(finalUrl);
}
