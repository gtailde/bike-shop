import { TextField } from 'components/UI/TextField/TextField';
import { type ITextFieldProps } from 'components/UI/TextField/types';
import React, { useState } from 'react';
import { type IProfileInfo } from '../types';

export const ProfileInfo = ({ onChange }: { onChange: (data: IProfileInfo) => void }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDateName, setBirthDateName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const profileInfoData: IProfileInfo = {
    firstName,
    lastName,
    birthDateName,
    email,
    password,
  };

  const formFields: ITextFieldProps[] = [
    {
      id: '1',
      type: 'text',
      label: 'First name',
      value: firstName,
      onChange: (value: string) => {
        setFirstName(value);
      },
    },
    {
      id: '2',
      type: 'text',
      label: 'Last name',
      value: lastName,
      onChange: (value: string) => {
        setLastName(value);
      },
    },
    {
      id: '3',
      type: 'date',
      label: 'Date of birth',
      value: birthDateName,
      onChange: (value: string) => {
        setBirthDateName(value);
      },
    },
    {
      id: '4',
      type: 'email',
      label: 'Email address',
      value: email,
      onChange: (value: string) => {
        setEmail(value);
      },
    },
    {
      id: '5',
      type: 'password',
      label: 'Password',
      value: password,
      onChange: (value: string) => {
        setPassword(value);
      },
    },
  ];

  return (
    <fieldset
      className="form__fieldset"
      onChange={() => {
        onChange(profileInfoData);
      }}
    >
      <p className="form__fieldset-headline">
        <legend className="form__legend">Profile Info</legend>
      </p>
      <div className="form__fieldset-content">
        {formFields.map(({ id, ...props }) => (
          <TextField key={id} {...props} />
        ))}
      </div>
    </fieldset>
  );
};
