import './style.scss';
import React, { useState, type ComponentProps } from 'react';

export const Counter = ({ className, ...props }: ComponentProps<'div'>) => {
  const [value, setValue] = useState(1);
  return (
    <div className={`counter ${className ?? ''}`} {...props}>
      <button className="counter__dec" onClick={() => setValue(value - 1)}>
        -
      </button>
      <span className="counter__value">{value}</span>
      <button className="counter__inc" onClick={() => setValue(value + 1)}>
        +
      </button>
    </div>
  );
};
