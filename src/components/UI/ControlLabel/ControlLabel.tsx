import './style.scss';
import React, { type ComponentProps } from 'react';
import { Icon } from '../Icon/Icon';

interface IControlLabelProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  onChange: (value: boolean) => void;
}

export const ControlLabel = ({ className, label, onChange, ...props }: IControlLabelProps) => {
  return (
    <label className={`${className ?? ''} checkbox-field`}>
      <input
        {...props}
        className="checkbox-field__input"
        type="checkbox"
        onChange={(evt) => {
          onChange(evt.target.checked);
        }}
      />
      <span className="checkbox-field__checker">
        <Icon variant="CHECK" />
      </span>
      <span className="checkbox-field__label">{label}</span>
    </label>
  );
};
