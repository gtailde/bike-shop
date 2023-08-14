import React, { type FC } from 'react';
import './style.scss';
import { type Props } from '../types';

export const AccentButton: FC<Props> = ({ className, children }) => {
  return <button className={`button-base accent-button ${className ?? ''}`}> {children} </button>;
};
