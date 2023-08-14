import { type ReactNode } from 'react';

export interface Props extends Omit<Partial<HTMLButtonElement>, 'children'> {
  children: ReactNode | undefined;
}
