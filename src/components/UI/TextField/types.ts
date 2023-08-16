import { type ComponentProps } from 'react';

export interface ITextFieldProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  label: string;
  helpText?: string;
  isTextShows?: boolean;
  isValid?: boolean;
  onChange: (value: string) => void;
}
