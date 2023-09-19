import './style.scss';
import React, { useState, type ComponentProps, useEffect } from 'react';

export const Counter = ({
  className,
  accent,
  initValue,
  onChangeValue,
  limit,
  ...props
}: ComponentProps<'div'> & {
  accent?: boolean;
  initValue?: number;
  onChangeValue: (count: number) => void;
  limit?: number;
}) => {
  const [value, setValue] = useState(initValue ?? 1);

  return (
    <div className={`counter ${className ?? ''} ${accent ? 'counter--accent' : ''}`} {...props}>
      <button
        className="counter__dec"
        onClick={() => {
          const validValue = value === 1 ? 1 : value - 1;
          onChangeValue(validValue);
          setValue(validValue);
        }}
      >
        -
      </button>
      <span className="counter__value">{value}</span>
      <button
        className="counter__inc"
        onClick={() => {
          onChangeValue(value + 1);
          setValue(value + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
