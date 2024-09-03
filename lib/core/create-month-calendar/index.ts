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
  // var dayOfTheWeekIndex: number = option?.get('dayOfTheWeekIndex') || 0;
  var dayOfTheWeekIndex: number = 0;
  var mutableDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth(),
    dayOfTheWeekIndex
  );

  var startDate = calculateStartDate(mutableDate, dayOfTheWeekIndex);
  var startDateTime = startDate.getTime();

  /* export */
  var possibleDaysInMonth = 42 as const;

  // /* export */
  // var days = Array.from({ length: possibleDaysInMonth }, (_, index) => {
  //   var newDate = new Date(startDateTime);
  //   var signal = createSignal(newDate, {
  //     equals: false,
  //   });

  //   calculateDay(newDate, index);

  //   (signal[0] as any)[DATE_SIGNAL_SETTER] = signal[1];

  //   return signal[0];
  // });
  var days = Array.from({ length: possibleDaysInMonth }, (_, index) => {
    var newDate = new Date(startDateTime);
    var signal = createSignal(newDate, {
      equals: false,
    });

    calculateDay(newDate, index);

    (signal[0] as any)[DATE_SIGNAL_SETTER] = signal[1];

    return signal[0];
  });

  /* export */
  var calculateDays = (predicate: () => number) => {
    mutableDate.setTime(predicate());
    mutableDate.setDate(dayOfTheWeekIndex);

    var startDate = calculateStartDate(mutableDate, dayOfTheWeekIndex);
    var startDateTime = startDate.getTime();

    batch(() => {
      days.forEach((day, index) => {
        (day as any)[DATE_SIGNAL_SETTER]((date: Date) => {
          return calculateDay(date, index, startDateTime);
        });
      });
    });
  };

  return {
    [DATE_SYMBOL]: mutableDate,
    possibleDaysInMonth,
    days: days as Readonly<typeof days>,
    calculateDays,
  };
};
