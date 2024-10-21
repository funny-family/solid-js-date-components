import { SetStoreFunction } from 'solid-js/store';
import {
  createMonthCalendar,
  MUTABLE_DATE_SYMBOL,
  SET_STATE_SYMBOL,
} from '../../core/create-month-calendar';

type MonthCalendar = ReturnType<typeof createMonthCalendar>;

var inRange = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

export var withMinMaxDate = (
  monthCalendar: MonthCalendar,
  minDate: Date,
  maxDate: Date
) => {
  var setState: SetStoreFunction<MonthCalendar> = (monthCalendar as any)[
    SET_STATE_SYMBOL
  ];

  var mutableDate: Date = (monthCalendar as any)[MUTABLE_DATE_SYMBOL];

  var isDateLimit = (date: Date, monthCalendar: MonthCalendar) => {
    return (
      date.getMonth() === monthCalendar.monthIndex &&
      date.getFullYear() === monthCalendar.year
    );
  };

  var monthCalendar_calculatePreviousMonth =
    monthCalendar.calculatePreviousMonth;
  var calculatePreviousMonth = () => {
    if (isDateLimit(minDate, monthCalendar)) {
      return;
    }

    monthCalendar_calculatePreviousMonth();
  };

  var monthCalendar_calculateNextMonth = monthCalendar.calculateNextMonth;
  var calculateNextMonth = () => {
    if (isDateLimit(maxDate, monthCalendar)) {
      return;
    }

    monthCalendar_calculateNextMonth();
  };

  var monthCalendar_calculateMonth = monthCalendar.calculateMonth;
  var calculateMonth = (predicate: () => number | Date) => {
    var dateTime = Number(predicate());

    mutableDate.setTime(dateTime);

    var monthIndex = mutableDate.getMonth();
    var year = mutableDate.getFullYear();

    if (
      inRange(monthIndex, minDate.getMonth(), maxDate.getMonth()) === false ||
      inRange(year, minDate.getFullYear(), maxDate.getFullYear()) === false
    ) {
      return;
    }

    monthCalendar_calculateMonth(predicate);
  };

  setState((state) => {
    return {
      ...state,
      calculateMonth,
      calculatePreviousMonth,
      calculateNextMonth,
    };
  });

  return monthCalendar;
};
