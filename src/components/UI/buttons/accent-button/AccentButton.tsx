import React, { type FC } from 'react';
import './style.scss';
import { type CustomButtonProps } from '../types';

export const AccentButton: FC<CustomButtonProps> = ({ className, children }) => {
  return <button className={`button-base accent-button ${className ?? ''}`}> {children} </button>;
};
