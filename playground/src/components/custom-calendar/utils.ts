// new Date(2024, 3, 0) -> 1711818000000

export var createWeekdayList = (
  locale: string,
  // 0 - 6
  weekdayStart: number,
  weekday: NonNullable<Intl.DateTimeFormatOptions['weekday']>
) => {
  var weekdayFormate = new Intl.DateTimeFormat(locale, { weekday });
  var date = new Date(1, 3, weekdayStart);

  return () => {
    const length = 7;

    return Array.from({ length }, () => {
      // 86400 seconds in one day
      date.setSeconds(date.getSeconds() + 86400);

      return weekdayFormate.format(date);
    });
  };
};

export var weekdayListWithDefaultArgs = (fn: typeof createWeekdayList) => {
  return fn('en-US', 0, 'short');
};

export var padWithZero = (day: string) => {
  return day.padStart(2, '0');
};
