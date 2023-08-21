import { type ITextFieldProps } from 'components/UI/TextField/types';

export const profileFormFields: ITextFieldProps[] = [
  {
    id: '1',
    type: 'text',
    label: 'First name',
    name: 'firstName',
  },
  {
    id: '2',
    type: 'text',
    label: 'Last name',
    name: 'lastName',
  },
  {
    id: '3',
    type: 'date',
    label: 'Date of birth',
    name: 'birthDate',
  },
  {
    id: '4',
    type: 'email',
    label: 'Email address',
    name: 'email',
  },
  {
    id: '5',
    type: 'password',
    label: 'Password',
    name: 'password',
  },
];

export const addressFormFields: ITextFieldProps[] = [
  {
    id: '1',
    type: 'text',
    label: 'Title',
    name: 'title',
  },
  {
    id: '2',
    type: 'text',
    label: 'Country',
    name: 'country',
  },
  {
    id: '3',
    type: 'text',
    label: 'City',
    name: 'city',
  },
  {
    id: '4',
    type: 'text',
    label: 'Street',
    name: 'street',
  },
  {
    id: '5',
    type: 'text',
    label: 'Postal Code',
    name: 'postalCode',
  },
];
