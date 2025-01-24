export async function fetchAccessToken(
  url: string,
  params: Record<string, string>
) {
  const queryParams = new URLSearchParams(params).toString();

  return await (
    await fetch(`${url}?${queryParams}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  ).json();
}

export async function fetchUserProfile(
  url: string,
  access_token: string,
  headers?: Record<string, string>
) {
  return await (
    await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        ...headers
      },
      cache: 'no-cache'
    })
  ).json();
}
