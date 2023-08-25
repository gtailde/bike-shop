import './style.scss';
import React, { type ChangeEvent, useState } from 'react';
import { TextField } from 'components/UI/TextField/TextField';
import useDebounce from 'hooks/useDebounce';

export interface IRangeSliderProps {
  className?: string;
  minLimit: number;
  maxLimit: number;
  onChange: (value: { min: number; max: number }) => void;
}

const GAP = 10; // percent

export const RangeSlider = ({ className, minLimit, maxLimit, onChange }: IRangeSliderProps) => {
  const [rangeValue, setRangeValue] = useState({ min: minLimit, max: maxLimit });
  const barMax = ((maxLimit - rangeValue.max) / (maxLimit - minLimit)) * 100;
  const barMin = ((rangeValue.min - minLimit) / (maxLimit - minLimit)) * 100;

  const calculateValidMinValue = (value: string) => {
    const numberValue = Number(value);
    const limit = rangeValue.max - ((maxLimit - minLimit) / 100) * GAP;
    return numberValue < minLimit ? minLimit : numberValue > limit ? limit : numberValue;
  };

  const calculateValidMaxValue = (value: string) => {
    const numberValue = Number(value);
    const limit = rangeValue.min + ((maxLimit - minLimit) / 100) * GAP;
    return numberValue > maxLimit ? maxLimit : numberValue < limit ? limit : numberValue;
  };

  const debounceMin = useDebounce((evt: ChangeEvent<HTMLInputElement>) => {
    const value = calculateValidMinValue(evt.target.value);
    const valueSet = { ...rangeValue, min: value };
    onChange(valueSet);
    setRangeValue(valueSet);
  }, 200);

  const debounceMax = useDebounce((evt: ChangeEvent<HTMLInputElement>) => {
    const value = calculateValidMaxValue(evt.target.value);
    const valueSet = { ...rangeValue, max: value };
    setRangeValue(valueSet);
  }, 200);

  return (
    <div className={`${className ?? ''} range-slider`}>
      <div className="range-slider__price-input">
        <TextField
          className="range-slider__input-field"
          type="number"
          label="Min"
          name="min"
          min={minLimit}
          max={maxLimit}
          value={rangeValue.min}
          onChange={(evt) => {
            const valueSet = { ...rangeValue, min: Number(evt.target.value) };
            setRangeValue(valueSet);
            debounceMin(evt);
          }}
        />
        <TextField
          className="range-slider__input-field"
          type="number"
          label="Max"
          name="max"
          min={minLimit}
          max={maxLimit}
          value={rangeValue.max}
          onChange={(evt) => {
            const valueSet = { ...rangeValue, max: Number(evt.target.value) };
            onChange(valueSet);
            setRangeValue(valueSet);
            debounceMax(evt);
          }}
        />
      </div>
      <div className="range-slider__rail">
        <div
          className="range-slider__range-bar"
          style={{ left: `${barMin}%`, right: `${barMax}%` }}
        ></div>
      </div>
      <div className="range-slider__handlers">
        <input
          className="range-slider__handler-min range-slider__handler input"
          type="range"
          min={minLimit}
          max={maxLimit}
          value={rangeValue.min}
          onChange={(evt) => {
            const value = calculateValidMinValue(evt.target.value);
            const valueSet = { ...rangeValue, min: value };
            onChange(valueSet);
            setRangeValue(valueSet);
          }}
          step="1"
        />
        <input
          className="range-max range-slider__handler input"
          type="range"
          min={minLimit}
          max={maxLimit}
          value={rangeValue.max}
          onChange={(evt) => {
            const value = calculateValidMaxValue(evt.target.value);
            const valueSet = { ...rangeValue, max: value };
            onChange(valueSet);
            setRangeValue(valueSet);
          }}
          step="1"
        />
      </div>
    </div>
  );
};
