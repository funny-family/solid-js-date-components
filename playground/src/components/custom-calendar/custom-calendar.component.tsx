import './custom-calendar.styles.css';
import { Component, For, Index } from 'solid-js';
// import { createCalendar } from '../../../../lib';
import { createMonthCalendar } from '../../../../lib/core/create-month-calendar';

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
        <div class="header__year">year</div>
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
        <For each={monthCalendar.days}>
          {(day) => {
            return <div class="day">{day().getDate()}</div>;
          }}
        </For>
      </div>
    </div>
  );
};
