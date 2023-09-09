import './style.scss';
import React, { type FC, useState } from 'react';
import { TextField } from 'components/UI/TextField/TextField';

export interface IRangeSliderProps {
  className?: string;
  minLimit: number;
  maxLimit: number;
  onChange: (value: { min: number; max: number }) => void;
}

const GAP = 10; // percent

export const RangeSlider: FC<IRangeSliderProps> = ({ className, minLimit, maxLimit, onChange }) => {
  const [minPriceValue, setMinPriceValue] = useState(minLimit);
  const [maxPriceValue, setMaxPriceValue] = useState(maxLimit);
  const [rangeValue, setRangeValue] = useState({ min: minLimit, max: maxLimit });
  const barMax = ((maxLimit - rangeValue.max) / (maxLimit - minLimit)) * 100;
  const barMin = ((rangeValue.min - minLimit) / (maxLimit - minLimit)) * 100;

  const calculateValidMinValue = (value: number) => {
    const numberValue = Number(value);
    const limit = rangeValue.max - ((maxLimit - minLimit) / 100) * GAP;
    return numberValue < minLimit ? minLimit : numberValue > limit ? limit : numberValue;
  };

  const calculateValidMaxValue = (value: number) => {
    const numberValue = Number(value);
    const limit = rangeValue.min + ((maxLimit - minLimit) / 100) * GAP;
    return numberValue > maxLimit ? maxLimit : numberValue < limit ? limit : numberValue;
  };

  const inputOnBlur = () => {
    const valueSet = {
      min: calculateValidMinValue(minPriceValue),
      max: calculateValidMaxValue(maxPriceValue),
    };
    setMinPriceValue(valueSet.min);
    setMaxPriceValue(valueSet.max);
    setRangeValue(valueSet);
  };

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
          value={minPriceValue}
          onChange={(evt) => {
            setMinPriceValue(Number(evt.target.value));
          }}
          onBlur={inputOnBlur}
        />
        <TextField
          className="range-slider__input-field"
          type="number"
          label="Max"
          name="max"
          min={minLimit}
          max={maxLimit}
          value={maxPriceValue}
          onChange={(evt) => {
            setMaxPriceValue(Number(evt.target.value));
          }}
          onBlur={inputOnBlur}
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
            const computedMinPrice = calculateValidMinValue(Number(evt.target.value));
            const valueSet = { min: computedMinPrice, max: maxPriceValue };
            setMinPriceValue(computedMinPrice);
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
            const computedMaxPrice = calculateValidMaxValue(Number(evt.target.value));
            const valueSet = { min: minPriceValue, max: computedMaxPrice };
            setMaxPriceValue(computedMaxPrice);
            onChange(valueSet);
            setRangeValue(valueSet);
          }}
          step="1"
        />
      </div>
    </div>
  );
};
