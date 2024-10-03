import './custom-calendar.styles.css';
import { Component, createEffect, createMemo, For, Index, on } from 'solid-js';
// import { createCalendar } from '../../../../lib';
import { createMonthCalendar } from '../../../../lib/core/create-month-calendar';
import {
  createWeekdayList,
  padWithZero,
  weekdayListWithDefaultArgs,
} from './utils';

// var monthFormate = new Intl.DateTimeFormat('ru', { month: 'long' });
var monthFormate = new Intl.DateTimeFormat('en-us', { month: 'long' });
var formatMonth = monthFormate.format;

export var CustomCalendar: Component = () => {
  var monthCalendar = createMonthCalendar(new Date());
  window.customMonthCalendar = monthCalendar;

  var getDate = (date: Date) => {
    return date.getDate();
  };

  var d = weekdayListWithDefaultArgs(createWeekdayList);

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
        <div class="header__year">{monthCalendar.year}</div>
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
        <For each={['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']}>
          {(dayOfTheWeek) => {
            return <div>{dayOfTheWeek}</div>;
          }}
        </For>
      </div>
      <div class="month-days custom-calendar-grid">
        <For each={monthCalendar.daysOfTheMonth}>
          {(dayOfTheMonth) => {
            return (
              <div class="day">
                {padWithZero(dayOfTheMonth.getDate().toString())}
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};
