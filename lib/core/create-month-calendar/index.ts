import { batch, createSignal } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  DATE_SIGNAL_SETTER,
  DATE_SYMBOL,
  calculateDay,
  calculateStartDate,
} from './utils';
import { ReactiveDate } from '../../reactive-date';

export var createMonthCalendar = (
  initialDate: Date,
  option?: Map<string, any>
) => {
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
  var mutableDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    dayOfTheWeekIndex
  );

  var startDate = calculateStartDate(mutableDate, dayOfTheWeekIndex);
  var startDateTime = startDate.getTime();

  /* export */
  var possibleDaysInCalendar = 42 as const;
  var l = 21; // "24 / 2 = 21"

  var store = createMutable({
    /* export */
    currentMonthIndex: 0,
    /* export */
    currentYear: 0,
    /* export */
    daysOfTheMonth: Array.from(
      { length: possibleDaysInCalendar },
      (_, index) => {
        const date = calculateDay(startDate, index, startDateTime);

        return {
          day: date.getDate(),
          weekDayIndex: date.getDay(),
          monthIndex: date.getMonth(),
          year: date.getFullYear(),
          time: date.getTime(),
        };
      }
    ),
  });

  // mutableDate.setFullYear(initialDate.getFullYear());
  // mutableDate.setMonth(initialDate.getMonth());
  // mutableDate.setDate(dayOfTheWeekIndex);

  store.currentMonthIndex = store.daysOfTheMonth[l].monthIndex;
  store.currentYear = store.daysOfTheMonth[l].year;

  /* export */
  var calculateDays = (predicate: () => number) => {
    var timeValue = predicate();

    mutableDate.setTime(timeValue);
    console.log({ mutableDate, m: mutableDate.getMonth() });
    var currentMonthIndex = mutableDate.getMonth();
    var currentYear = mutableDate.getFullYear();
    mutableDate.setDate(dayOfTheWeekIndex);

    var startDate = calculateStartDate(mutableDate, dayOfTheWeekIndex);
    var startDateTime = startDate.getTime();

    batch(() => {
      store.currentMonthIndex = currentMonthIndex;
      store.currentYear = currentYear;

      store.daysOfTheMonth.forEach((dayOfTheMonth, index) => {
        const date = calculateDay(startDate, index, startDateTime);

        dayOfTheMonth.day = date.getDate();
        dayOfTheMonth.weekDayIndex = date.getDay();
        dayOfTheMonth.monthIndex = date.getMonth();
        dayOfTheMonth.year = date.getFullYear();
        dayOfTheMonth.time = date.getTime();
      });

      console.log({ currentMonthIndex, currentYear });
    });
  };

  return {
    [DATE_SYMBOL]: mutableDate,
    possibleDaysInCalendar,
    currentMonthIndex: store.currentMonthIndex as Readonly<
      typeof store.currentMonthIndex
    >,
    currentYear: store.currentYear as Readonly<typeof store.currentYear>,
    daysOfTheMonth: store.daysOfTheMonth as Readonly<
      typeof store.daysOfTheMonth
    >,
    calculateDays,
  };
};
