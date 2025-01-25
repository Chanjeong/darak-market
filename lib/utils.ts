export function formatToTime(created_at: string) {
  const milDays = 1000 * 60 * 60 * 24;
  const milHours = 1000 * 60 * 60;
  const milMins = 1000 * 60;

  const time = new Date(created_at).getTime();
  const now = new Date().getTime();
  const diff = now - time;

  const formatter = new Intl.RelativeTimeFormat('ko');

  if (diff < milMins) return '방금 막';
  if (diff < milHours)
    return formatter.format(-Math.floor(diff / milMins), 'minutes');
  if (diff < milDays)
    return formatter.format(-Math.floor(diff / milHours), 'hours');
  return formatter.format(-Math.floor(diff / milDays), 'days');
}

export function formatToWon(price: number) {
  return price.toLocaleString('ko-KR');
}
