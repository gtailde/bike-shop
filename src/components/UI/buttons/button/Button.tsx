import React, { type FC } from 'react';
import '../style.scss';
import { type CustomButtonProps } from '../types';

export const Button: FC<CustomButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`button ${className ?? ''}`}>
      {' '}
      {children}{' '}
    </button>
  );
};
