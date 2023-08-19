import { type ComponentProps } from 'react';

export interface ITextFieldProps extends Omit<ComponentProps<'input'>, 'onChange' | 'ref'> {
  label: string;
  helpText?: string;
  isTextShows?: boolean;
  isValid?: boolean;
  ref?: React.Ref<React.RefObject<HTMLInputElement>>;
  onChange: (value: string) => void;
}
