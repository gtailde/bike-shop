import React, { type FC } from 'react';
import './style.scss';
import { type Props } from '../types';

export const Button: FC<Props> = ({ className, children }) => {
  return <button className={`button-base button ${className ?? ''}`}> {children} </button>;
};
