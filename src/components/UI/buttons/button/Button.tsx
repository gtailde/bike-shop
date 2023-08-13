import React, { type FC } from 'react';
import './style.scss';
import { type CustomButtonProps } from '../types';

export const Button: FC<CustomButtonProps> = ({ className, children }) => {
  return <button className={`button-base button ${className ?? ''}`}> {children} </button>;
};
