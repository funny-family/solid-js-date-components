import './custom-calendar.styles.css';
import { Component, For, Index } from 'solid-js';
// import { createCalendar } from '../../../../lib';
import { createMonthCalendar } from '../../../../lib/core/create-month-calendar';

const monthFormate = new Intl.DateTimeFormat('en-us', { month: 'long' });

export var CustomCalendar: Component = () => {
  var monthCalendar = createMonthCalendar(new Date());
  window.customMonthCalendar = monthCalendar;

  var getDate = (date: Date) => {
    return date.getDate();
  };

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
        <div class="header__year">{monthCalendar.currentYear}</div>
        <div class="header__month">
          {monthFormate.format(monthCalendar.daysOfTheMonth[21].time)}
        </div>
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
        <Index each={['Sun', 'Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat']}>
          {(dayOfTheWeek) => {
            return <div>{dayOfTheWeek()}</div>;
          }}
        </Index>
      </div>
      <div class="month-days custom-calendar-grid">
        <For each={monthCalendar.daysOfTheMonth}>
          {(dayOfTheMonth) => {
            return <div class="day">{dayOfTheMonth.day}</div>;
          }}
        </For>
      </div>
    </div>
  );
};
