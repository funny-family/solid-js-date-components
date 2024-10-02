import './custom-calendar.styles.css';
import { Component, createEffect, createMemo, For, Index, on } from 'solid-js';
// import { createCalendar } from '../../../../lib';
import { createMonthCalendar } from '../../../../lib/core/create-month-calendar';
import { MonthName } from '../../../../lib/core/create-month-calendar/month.component';

// var monthFormate = new Intl.DateTimeFormat('ru', { month: 'long' });
var monthFormate = new Intl.DateTimeFormat('en-us', { month: 'long' });
var formatMonth = monthFormate.format;

var getMonth = (monthIndex: number, format?: (index: number) => string) => {
  format = monthFormate.format;

  var month = () => {
    return '';
  };

  // createEffect(
  //   on(
  //     () => monthIndex,
  //     (index) => {
  //       month = () => format(index);
  //     }
  //   )
  // );

  return month;
};

export var CustomCalendar: Component = () => {
  var monthCalendar = createMonthCalendar(new Date());
  window.customMonthCalendar = monthCalendar;

  var getDate = (date: Date) => {
    return date.getDate();
  };

  // createEffect(
  //   on(
  //     () => monthCalendar.monthIndex,
  //     (monthIndex) => {
  //       console.log(monthIndex);
  //     }
  //   )
  // );

  var month = getMonth(monthCalendar.monthIndex);

  return (
    <div class="custom-calendar">
      <div class="header">
        <button
          class="header__button"
          type="button"
          onClick={() => {
            // calendar.calculatePreviousDaysOfMonth();
          }}
        >
          {'<-'}
        </button>
        <div class="header__year">{monthCalendar.year}</div>
        <div class="header__month">{formatMonth(monthCalendar.dateTime)}</div>
        <button
          class="header__button"
          type="button"
          onClick={() => {
            // calendar.calculateNextDaysOfMonth();
          }}
        >
          {'->'}
        </button>
      </div>
      <div class="week-days custom-calendar-grid">
        {/* <Index each={['Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat', 'Sun']}>
          {(dayOfTheWeek) => {
            return <div>{dayOfTheWeek()}</div>;
          }}
        </Index> */}
        <For each={['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']}>
          {(dayOfTheWeek) => {
            return <div>{dayOfTheWeek}</div>;
          }}
        </For>
      </div>
      <div class="month-days custom-calendar-grid">
        <For each={monthCalendar.daysOfTheMonth}>
          {(dayOfTheMonth) => {
            return <div class="day">{dayOfTheMonth.getDate()}</div>;
          }}
        </For>
      </div>
    </div>
  );
};
