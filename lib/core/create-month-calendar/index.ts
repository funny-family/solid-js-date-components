import { batch, createSignal, Index } from 'solid-js';
import { createMutable } from 'solid-js/store';
import {
  DATE_SIGNAL_SETTER,
  DATE_SYMBOL,
  calculateDay,
  calculateStartDate,
} from './utils';

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
  var daysInCalendar = 42 as const;
  // var l = 21; // "24 / 2 = 21"

  /*  export */
  var monthIndex = initialDate.getMonth();
  /* export */
  var year = initialDate.getFullYear();
  /* export */
  var dateTime = initialDate.getTime();

  var length = daysInCalendar;
  /* export */
  const daysOfTheMonth = Array.from({ length }, (_, index) => {
    const date = new Date(startDateTime);

    return calculateDay(date, index);
  });

  /* export */
  var calculateMonth = (predicate: () => number | Date) => {
    var timeValue = Number(predicate());

    mutableDate.setTime(timeValue);

    batch(() => {
      var monthIndex = mutableDate.getMonth();
      var year = mutableDate.getFullYear();
      var time = mutableDate.getTime();

      store.monthIndex = monthIndex;
      store.year = year;
      store.dateTime = time;
    });

    mutableDate.setDate(dayOfTheWeekIndex);

    var startDate = calculateStartDate(mutableDate, dayOfTheWeekIndex);
    var startDateTime = startDate.getTime();

    /*
      Note that all "strange" calculation that we are doing in loop below is because "solidjs" sucks ass hard.
      Also, calendar recalculation should not be inside "batch", since ("solidjs" sucks ass hard) and we need to update array somehow.
    */
    var tempDate = null as unknown as Date;
    var daysOfTheMonth = store.daysOfTheMonth;
    for (var i = 0; i < daysOfTheMonth.length; i++) {
      // store date in temporal variable for future use
      (tempDate as any) = daysOfTheMonth[i];
      // nullify the date in the array so it can be recalculated next time
      daysOfTheMonth[i] = mutableDate;
      // recalculate the date in the array at the current index with the updated start date and time
      daysOfTheMonth[i] = calculateDay(tempDate, i, startDateTime);
    }
  };

  var calculateMonthByIndex = (offset: number) => () => {
    mutableDate.setTime(store.dateTime);
    // prettier-ignore
    var monthIndex = (mutableDate.getMonth() + (+offset))
    mutableDate.setMonth(monthIndex);
    var newDateTime = mutableDate.getTime();

    calculateMonth(() => {
      return newDateTime;
    });
  };

  /* export */
  var calculatePreviousMonth = calculateMonthByIndex(-1);

  /* export */
  var calculateNextMonth = calculateMonthByIndex(1);

  var store = createMutable({
    daysInCalendar,
    monthIndex,
    year,
    dateTime,
    daysOfTheMonth,
    calculateMonth,
    calculatePreviousMonth,
    calculateNextMonth,
  });

  return store;
};
