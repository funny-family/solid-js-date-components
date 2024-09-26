import './app.styles.css';
import { Component } from 'solid-js';
import { CustomCalendar } from './components/custom-calendar/custom-calendar.component';

export var App: Component = () => {
  return (
    <main>
      <section>
        <h1>Calendar</h1>
        <CustomCalendar />
      </section>
    </main>
  );
};
