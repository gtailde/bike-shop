import React, { type FC } from 'react';
import '../style.scss';
import { type CustomButtonProps } from '../types';

export const AccentButton: FC<CustomButtonProps> = ({ onClick, className, children }) => {
  return (
    <button onClick={onClick} className={`button button--accent ${className ?? ''}`}>
      {' '}
      {children}{' '}
    </button>
  );
};
