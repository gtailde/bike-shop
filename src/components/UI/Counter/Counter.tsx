import './style.scss';
import React, { type FC, useState, type ComponentProps } from 'react';

interface CounterProps {
  accent?: boolean;
  initValue?: number;
  onChangeValue: (count: number) => void;
  limit?: number;
}

export const Counter: FC<ComponentProps<'div'> & CounterProps> = ({
  className,
  accent,
  initValue,
  onChangeValue,
  limit,
  ...props
}) => {
  const [value, setValue] = useState(initValue ?? 1);

  const onClickDec = () => {
    const validValue = value === 1 ? 1 : value - 1;
    onChangeValue(validValue);
    setValue(validValue);
  };

  const onClickInc = () => {
    onChangeValue(value + 1);
    setValue(value + 1);
  };

  return (
    <div className={`counter ${className ?? ''} ${accent ? 'counter--accent' : ''}`} {...props}>
      <button className="counter__dec" onClick={onClickDec}>
        -
      </button>
      <span className="counter__value">{value}</span>
      <button className="counter__inc" onClick={onClickInc}>
        +
      </button>
    </div>
  );
};
