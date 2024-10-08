import './custom-calendar.styles.css';
import {
  Component,
  createEffect,
  createMemo,
  For,
  Index,
  on,
  Show,
} from 'solid-js';
import { createMonthCalendar } from '../../../../lib/core/create-month-calendar';
import {
  createWeekdayList,
  isWeekend,
  padWithZero,
} from '../../../../lib/core/utils';
import { YearSelect } from '../../../../lib/core/components/year-select/year-select.component';

var monthFormate = new Intl.DateTimeFormat('en-us', { month: 'long' });
var formatMonth = monthFormate.format;

var weekdayFormate = new Intl.DateTimeFormat('en-us', { weekday: 'short' });
var formatWeekday = weekdayFormate.format;

export var CustomCalendar: Component = () => {
  var date = new Date();
  var monthCalendar = createMonthCalendar(date);
  window.customMonthCalendar = monthCalendar;

  var weekdays = createWeekdayList(0, formatWeekday);

  // createEffect(
  //   on(
  //     () => monthCalendar.monthIndex,
  //     (monthIndex) => {
  //       console.log(monthIndex);
  //     }
  //   )
  // );

  return (
    <div class="custom-calendar">
      <div class="header">
        <button
          class="header__button"
          type="button"
          onClick={() => {
            monthCalendar.calculatePreviousMonth();
          }}
        >
          {'<-'}
        </button>
        <div class="header__year">
          {monthCalendar.year}
          <YearSelect />
        </div>
        <div class="header__month">{formatMonth(monthCalendar.dateTime)}</div>
        <button
          class="header__button"
          type="button"
          onClick={() => {
            monthCalendar.calculateNextMonth();
          }}
        >
          {'->'}
        </button>
      </div>
      <div class="week-days custom-calendar-grid">
        <For each={weekdays}>
          {(dayOfTheWeek) => {
            return <div style={{ 'text-align': 'center' }}>{dayOfTheWeek}</div>;
          }}
        </For>
      </div>
      <div class="month-days custom-calendar-grid">
        <For each={monthCalendar.daysOfTheMonth}>
          {(dayOfTheMonth) => {
            var day = padWithZero(`${dayOfTheMonth.getDate()}`);

            var visibility = (
              dayOfTheMonth.getMonth() === monthCalendar.monthIndex
                ? undefined
                : 'hidden'
            ) as any;

            var _color = (dayOfTheMonth: Date, monthIndex: number) => {
              if (isWeekend(dayOfTheMonth)) {
                return 'red';
              }

              return dayOfTheMonth.getMonth() === monthIndex
                ? undefined
                : 'gainsboro';
            };
            var color = _color(dayOfTheMonth, monthCalendar.monthIndex);

            return (
              <div
                class="day"
                style={
                  {
                    // visibility,
                    // color,
                  }
                }
              >
                {day}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
