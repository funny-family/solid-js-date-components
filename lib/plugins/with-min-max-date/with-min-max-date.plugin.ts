import { SetStoreFunction } from 'solid-js/store';
import {
  createMonthCalendar,
  SET_STATE_SYMBOL,
} from '../../core/create-month-calendar';

export var withMinMaxDate = (
  monthCalendar: ReturnType<typeof createMonthCalendar>,
  minDate: Date | number,
  maxDate: Date | number
) => {
  console.log(monthCalendar);

  var setState = (monthCalendar as any)[SET_STATE_SYMBOL] as SetStoreFunction<
    ReturnType<typeof createMonthCalendar>
  >;

  console.log(setState);

  var minDateValue = Number(minDate);
  var maxDateValue = Number(maxDate);

  var monthCalendar_calculatePreviousMonth =
    monthCalendar.calculatePreviousMonth;
  var calculatePreviousMonth = () => {
    console.log('calculatePreviousMonth');

    monthCalendar_calculatePreviousMonth();
  };

  var monthCalendar_calculateNextMonth = monthCalendar.calculateNextMonth;
  var calculateNextMonth = () => {
    console.log('calculateNextMonth');

    monthCalendar_calculateNextMonth();
  };

  setState((state) => {
    return {
      ...state,
      calculatePreviousMonth,
      calculateNextMonth,
    };
  });

  return monthCalendar;
};
