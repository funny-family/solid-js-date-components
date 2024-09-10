export var DATE_SYMBOL = Symbol('DATE_SYMBOL') as symbol;

export var DATE_SIGNAL_SETTER = Symbol('DATE_SIGNAL_SETTER') as symbol;
window.DATE_SIGNAL_SETTER = DATE_SIGNAL_SETTER;

export var calculateStartDate = (
  date: Date,
  dayOfTheWeekIndex: number
): Date => {
  // Seeking for Day that weak should start with
  while (date.getDay() !== dayOfTheWeekIndex) {
    const day = date.getDate();
    date.setDate(day - 1);
  }

  return date;
};

export var calculateDay = (date: Date, offset: number, time?: number) => {
  if (time) {
    date.setTime(time);
  }

  if (offset > 0) {
    date.setDate(date.getDate() + offset);
  }

  return date;
};

type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T
  ? ((t: T, ...a: A) => void) extends (...x: infer X) => void
    ? X
    : never
  : never;
type EnumerateInternal<A extends Array<unknown>, N extends number> = {
  0: A;
  1: EnumerateInternal<PrependNextNum<A>, N>;
}[N extends A['length'] ? 0 : 1];
export type Enumerate<N extends number> = EnumerateInternal<
  [],
  N
> extends (infer E)[]
  ? E
  : never;
/**
  @see https://stackoverflow.com/a/63918062
*/
export type Range<FROM extends number, TO extends number> = Exclude<
  Enumerate<TO>,
  Enumerate<FROM>
>;

// export var createDaysOfTheWeekOrderList = (
//   daysOfTheWeekList: string[],
//   startIndex: Range<0, 7>,
//   mutate?: boolean
// ) => {
//   var _mutate = mutate == null ? false : mutate;

//   var array = Array.from({ length: daysOfTheWeekList.length }, () => {
//     return '';
//   });

//   return array;
// };
