import { type ComponentProps } from 'react';

export interface ITextFieldProps extends ComponentProps<'input'> {
  label: string;
  helpText?: string;
  isTextShows?: boolean;
  isValid?: boolean;
}
