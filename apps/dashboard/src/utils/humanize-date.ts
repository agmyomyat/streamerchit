export function HumanizeDate(date: Date) {
  if (date instanceof Date === false) return null;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } satisfies Intl.DateTimeFormatOptions;
  const formattedDate = date.toLocaleString('en-US', options);
  return formattedDate;
}
