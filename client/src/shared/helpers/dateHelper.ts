type TGetTimeString = (date: Date | number, language?: string) => string;

class DateHelper {
  constructor() {
  }

  getBeautifulDate(now: number, divider: string = '/'): string {
    const date = new Date(now);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}${divider}${month}${divider}${day}`;
  }

  getTimeString: TGetTimeString = (
    date,
    language = navigator.language
  ): string => {
    if (!date) return '';
    const timeMs = typeof date === 'number' ? date : date.getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

    const datesInSeconds: number[] = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
    ];

    const units: Intl.RelativeTimeFormatUnit[] = [
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'year',
    ];

    const index = datesInSeconds.findIndex((el) => el > Math.abs(deltaSeconds));
    const divisor = index ? datesInSeconds[index - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });

    return rtf.format(Math.floor(deltaSeconds / divisor), units[index]);
  };
}

export default new DateHelper();
