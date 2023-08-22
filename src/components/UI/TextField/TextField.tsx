import './style.scss';
import React, { useState, forwardRef } from 'react';
import { Icon } from '../Icon/Icon';
import { type ITextFieldProps } from './types';

export const TextField = forwardRef<HTMLInputElement, ITextFieldProps>(
  (
    { id, type = 'text', label, isValid, helpText, className, onChange, ...props }: ITextFieldProps,
    ref,
  ) => {
    const [isActiveOption, setIsActiveOption] = useState(false);
    let hasOption = false;
    let fieldIcon = null;

    switch (type) {
      case 'password':
        fieldIcon = isActiveOption ? <Icon variant="CLOSED_EYE" /> : <Icon variant="OPENED_EYE" />;
        type = isActiveOption ? 'text' : 'password';
        hasOption = true;
        break;
      case 'date':
        fieldIcon = <Icon variant="CALENDAR" />;
        hasOption = true;
    }

    return (
      <div className={`${className ?? ''} text-field ${isValid ? '' : 'text-field--invalid'}`}>
        <div className="text-field__container">
          <input
            {...props}
            ref={ref}
            onChange={onChange}
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
        <p className="text-field__text-helper">{helpText ?? ''}</p>
      </div>
    );
  },
);
