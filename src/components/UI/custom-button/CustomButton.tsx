import React, { type FC } from 'react';
import './style.scss';

interface CustomButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const CustomButton: FC<CustomButtonProps> = ({ className, children }) => {
  return <button className={`custom-button ${className ?? ''}`}> {children} </button>;
};
