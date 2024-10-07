var setDayOfWeek = (date: Date, weekdayIndex: number) => {
  var currentDay = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  // Calculate the difference between the current day and target day
  var dayDifference = weekdayIndex - currentDay;
  // If the target day is in the past, adjust it to the next week
  var adjustDays = dayDifference >= 0 ? dayDifference : 7 + dayDifference;

  date.setDate(date.getDate() + adjustDays);

  return date;
};

/* export */
export var createWeekdayList = <TFormat extends Intl.DateTimeFormat['format']>(
  weekdayIndex: number,
  format: TFormat
) => {
  // prettier-ignore
  var date = new Date(1, 3, (0 + weekdayIndex));
  var currentWeekday = date.getDay();

  const length = 7;
  return Array.from({ length }, (_, i) => {
    // prettier-ignore
    var newDate = setDayOfWeek(date, (currentWeekday + i));

    return format(newDate);
  });
};

/* export */
export var padWithZero = (day: string) => {
  return day.padStart(2, '0');
};

/* export */
export var isWeekend = (date: Date) => {
  var weekday = date.getDay();

  return weekday === 5 || weekday === 6;
};
