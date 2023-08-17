import './style.scss';
import React, { useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import { type ITextFieldProps } from './types';

export const TextField = ({
  id,
  type = 'text',
  label,
  isValid = true,
  helpText,
  isTextShows = false,
  className,
  onChange,
  ...props
}: ITextFieldProps) => {
  const [isActiveOption, setIsActiveOption] = useState(false);
  let hasOption = false;
  let fieldIcon = null;
  const inputRef = useRef<HTMLInputElement>(null);

  switch (type) {
    case 'password':
      fieldIcon = isActiveOption ? <Icon variant="CLOSED_EYE" /> : <Icon variant="OPENED_EYE" />;
      type = isActiveOption ? 'text' : 'password';
      hasOption = true;
      break;
    case 'date':
      fieldIcon = (
        <Icon
          onClick={() => {
            inputRef.current?.showPicker();
          }}
          variant="CALENDAR"
        />
      );
      hasOption = true;
  }

  return (
    <div className={`${className ?? ''} text-field ${isValid ? '' : 'text-field--invalid'}`}>
      <div className="text-field__container">
        <input
          {...props}
          ref={inputRef}
          onChange={(evt) => {
            onChange(evt.target.value);
          }}
          className="text-field__input"
          id={id}
          placeholder=""
          type={type}
          autoComplete="on"
        />
        <label className="text-field__label" htmlFor={id}>
          {label}
        </label>
        <fieldset className="text-field__fieldset">
          <legend className="text-field__legend">
            <span>{label}</span>
          </legend>
        </fieldset>
        <div
          className="text-field__icon-container"
          style={{ pointerEvents: hasOption ? 'auto' : 'none' }}
          onClick={() => {
            setIsActiveOption(!isActiveOption);
          }}
        >
          {fieldIcon}
        </div>
      </div>
      <p className="text-field__text-helper">{isTextShows && helpText}</p>
    </div>
  );
};
