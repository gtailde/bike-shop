import './style.scss';
import React, { type ComponentProps } from 'react';

export const Form = ({ className, ...props }: ComponentProps<'form'>) => {
  return <form {...props} className={`${className ?? ''} form`}></form>;
};
