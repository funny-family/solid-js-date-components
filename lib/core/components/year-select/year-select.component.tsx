import './year-select.styles.css';
import { type JSX, type Component, createUniqueId, splitProps } from 'solid-js';

/*
  https://stackoverflow.com/questions/11561200/select-tag-with-1000-options-performance-hit
*/
export type YearSelectAttrs = JSX.IntrinsicElements['div'];

export type YearSelectProps = {
  value?: string;
};

export type YearSelectAttrsAndProps = YearSelectAttrs & YearSelectProps;

export type YearSelectComponent = Component<YearSelectAttrsAndProps>;

export var YearSelect = ((attrsAndProps) => {
  var [props, rest] = splitProps(attrsAndProps, ['value']);

  var inputId = createUniqueId();

  return (
    <div {...(rest as any)} class="year-select">
      <input type="text" value={props?.value} list={inputId} />
      <datalist id={inputId}>{attrsAndProps?.children}</datalist>
    </div>
  );
}) as YearSelectComponent;
