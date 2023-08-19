import { SvgIcons } from './SvgIcons';
import './style.scss';
import React, { type ComponentProps } from 'react';

export const Icon = ({
  variant,
  ...props
}: ComponentProps<'span'> & { variant: keyof typeof SvgIcons }) => {
  return <span {...props}>{SvgIcons[variant]}</span>;
};
