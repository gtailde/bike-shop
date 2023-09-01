import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema } from 'components/blocks/Registration/schemes';
import { useForm } from 'react-hook-form';
import { profileFormFields } from './formFields';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { type ICustomer } from 'types/types';

export const UserInfoEdit = ({
  firstName,
  lastName,
  email,
  birthDate,
  onBack,
  onSave,
}: Partial<ICustomer & { birthDate: Date; onBack: () => void; onSave: () => void }>) => {
  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      birthDate,
    },
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">User profile</legend>
        <Button onClick={onBack}>Back</Button>
      </p>
      <div className="form__fieldset-content">
        {profileFormFields.map(({ name, ...data }) => (
          <TextField
            {...data}
            key={name}
            isValid={!errors[name]}
            helpText={errors[name]?.message}
            {...register(name)}
          />
        ))}
      </div>
      <Button className="form__fieldset-button" accent onClick={onSave}>
        Save
      </Button>
    </fieldset>
  );
};
