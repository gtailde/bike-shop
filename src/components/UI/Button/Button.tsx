import './style.scss';
import React, { type FC, type ComponentProps } from 'react';

export interface IButtonProps extends ComponentProps<'button'> {
  accent?: boolean;
}

export const Button: FC<IButtonProps> = ({ accent, className, ...props }) => {
  return (
    <button
      {...props}
      className={`button ${accent ?? false ? 'button--accent' : ''} ${className ?? ''}`}
    ></button>
  );
};
