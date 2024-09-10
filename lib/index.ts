import { batch } from 'solid-js';
import { createMutable } from 'solid-js/store';

export var DATE_SYMBOL = Symbol('DATE_SYMBOL') as symbol;

export var calculateStartDate = (
  startDate: Date,
  dayOfTheWeekIndex: number
): Date => {
  // Seeking for Day that weak should start with
  while (startDate.getDay() !== dayOfTheWeekIndex) {
    const day = startDate.getDate();
    startDate.setDate(day - 1);
  }

  return startDate;
};

/**
 * @see https://stackoverflow.com/questions/46004656/how-to-reliably-implement-next-previous-month
 */
export var setPreviousMonthDate = (date: Date) => {
  var month = date.getMonth();

  // if (month !== 0) {
  //   date.setMonth(month - 1);
  // }

  date.setMonth(month - 1);

  return date;
};

/**
 * @see https://stackoverflow.com/questions/46004656/how-to-reliably-implement-next-previous-month
 */
export var setNextMonthDate = (date: Date) => {
  var month = date.getMonth();

  if (month !== 11) {
    date.setMonth(month + 1);
  }

  // date.setMonth(month + 1);

  return date;
};

var calculateDay = (date: Date, time: number, index: number) => {
  date.setTime(time);

  if (index > 0) {
    date.setDate(date.getDate() + index);
  }

  return date.getDate();
};

export var createCalendar = (initialDate: Date, option?: Map<string, any>) => {
  /*
    0: 'Sunday'
    1: 'Monday'
    2: 'Tuesday'
    3: 'Wednesday'
    4: 'Thursday'
    5: 'Friday'
    6: 'Saturday'
  */
  var dayOfTheWeekIndex: number = option?.get('dayOfTheWeekIndex') || 0;
  var date = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    dayOfTheWeekIndex
  );

  var startDate = calculateStartDate(date, dayOfTheWeekIndex);
  var startDateTime = startDate.getTime();

  /* export */
  var possibleDaysInCalendar = 42 as const;

  var store = createMutable({
    year: 0,
    days: Array.from({ length: possibleDaysInCalendar }, (_, index) => {
      return calculateDay(startDate, startDateTime, index);
    }),
  });

  date.setFullYear(initialDate.getFullYear());
  date.setMonth(initialDate.getMonth());
  date.setDate(dayOfTheWeekIndex);

  /* export */
  var calculateDaysOfMonth = (predicate: () => number) => {
    var timeValue = predicate();

    date.setTime(timeValue);
    date.setDate(dayOfTheWeekIndex);

    var startDate = calculateStartDate(date, dayOfTheWeekIndex);
    var startDateTime = startDate.getTime();

    batch(() => {
      store.days.forEach((_, index, array) => {
        array[index] = calculateDay(startDate, startDateTime, index);
      });
    });
  };

  var calculatePreviousDaysOfMonth = () => {
    console.log(date);

    // var previousMonthDate = setPreviousMonthDate(date);
    // calculateDaysOfMonth(() => {
    //   return previousMonthDate.getTime();
    // });
    // date.setMonth(date.getMonth() - 1);
    // var startDate = calculateStartDate(date, dayWeekStart);
    // var startDateTime = startDate.getTime();
    // store.days.forEach((_, index) => {
    //   store.days[index] = calculateDay(startDate, startDateTime, index);
    // });
  };

  var calculateNextDaysOfMonth = () => {
    console.log(1, date);
    date.setFullYear(date.getFullYear());
    setNextMonthDate(date);
    date.setDate(dayOfTheWeekIndex);
    console.log(2, date);

    var startDate = calculateStartDate(date, dayOfTheWeekIndex);
    var startDateTime = startDate.getTime();

    batch(() => {
      store.days.forEach((_, index, array) => {
        array[index] = calculateDay(startDate, startDateTime, index);
      });
    });
  };

  return {
    [DATE_SYMBOL]: date,
    possibleDaysInCalendar,
    days: store.days as Readonly<typeof store.days>,
    year: store.year as Readonly<typeof store.year>,
    calculateDaysOfMonth,
    calculatePreviousDaysOfMonth,
    calculateNextDaysOfMonth,
  };
};
