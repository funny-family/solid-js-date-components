import { createSignal } from 'solid-js';

export class ReactiveDate extends Date {
  #tracingId = 1;
  #tracingSignal = createSignal(this.#tracingId, {
    equals: false,
  });

  setTime(timeValue: number) {
    const value = super.setTime(timeValue);

    this.#tracingSignal[1](this.#tracingId++);

    return value;
  }
}
