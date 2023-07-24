export function HumanizeDate(date: string) {
  let _date: Date;
  try {
    _date = new Date(date);
  } catch (e) {
    console.log(e);
    return null;
  }
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  } satisfies Intl.DateTimeFormatOptions;
  const formattedDate = _date.toLocaleString('en-US', options);
  return formattedDate;
}
