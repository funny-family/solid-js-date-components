// new Date(2024, 3, 0) -> 1711818000000

var f = (
  // 0 - 6
  weekdayStart: number,
  format: Function
) => {
  // 7 days in the week
  const length = 7;
  // new Date(2023, 9, 0) -> 1696006800000
  var t = 1696006800000;
  var millisecondsInOneDay = 86400000;

  return Array.from({ length }, (_, index) => {
    // prettier-ignore
    return format(
      t + (
        millisecondsInOneDay * ((weekdayStart + 1) * (index + 1))
      )
    );
  });
};

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

/* export */
export var isSameMonth = (date1: Date, date2: Date) => {
  return date1.getMonth() === date2.getMonth();
};

/* export */
export var padWithZero = (day: string) => {
  return day.padStart(2, '0');
};
