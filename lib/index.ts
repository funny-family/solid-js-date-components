import { createMutable } from 'solid-js/store';

export var calculateStartDate = (
  startDate: Date,
  dayWeekStart: number
): Date => {
  // var startDate = new Date(date.getFullYear(), date.getMonth(), 1);

  // Seeking for Day that weak should start with
  while (startDate.getDay() !== dayWeekStart) {
    const day = startDate.getDate();
    startDate.setDate(day - 1);
  }

  return startDate;
};

export var createCalendar = (
  initialTimeValue: number,
  option?: Map<string, any>
) => {
  var date = new Date();
  // Initially set date to the first day of the month
  date.setDate(1);

  /*
    0 -> week starts with "Sunday"
    1 -> week starts with "Monday"
  */
  var dayWeekStart: number = option?.get('dayWeekStart') || 1;
  var startDate = calculateStartDate(date, dayWeekStart);
  var startDateTime = startDate.getTime();

  /* export */
  var possibleDaysInCalendar = 42 as const;

  var calculateDay = (date: Date, time: number, index: number) => {
    date.setTime(time);

    if (index > 0) {
      date.setDate(date.getDate() + index);
    }

    return date.getDate();
  };

  /* export */
  var days = createMutable(
    Array.from({ length: possibleDaysInCalendar }, (_, index) => {
      // startDate.setTime(startDateTime);

      // if (index > 0) {
      //   startDate.setDate(startDate.getDate() + index);
      // }

      // return startDate.getDate();

      return calculateDay(startDate, startDateTime, index);
    })
  );

  /* export */
  var calculateMonth = (predicate: () => number) => {
    var timeValue = predicate();

    date.setTime(timeValue);

    var startDate = calculateStartDate(date, dayWeekStart);
    var startDateTime = startDate.getTime();

    days.forEach((_, index, array) => {
      // startDate.setTime(startDateTime);

      // if (index > 0) {
      //   startDate.setDate(startDate.getDate() + index);
      // }

      // days[index] = startDate.getDate();

      array[index] = calculateDay(startDate, startDateTime, index);
    });
  };

  var calculateNextMonth = () => {
    //
  };

  var calculatePreviousMonth = () => {
    //
  };

  return {
    // date,
    possibleDaysInCalendar,
    days: days as Readonly<typeof days>,
    calculateMonth,
  };
};
