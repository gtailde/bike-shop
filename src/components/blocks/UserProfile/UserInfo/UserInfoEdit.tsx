import React, { type FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileFormSchema } from 'components/blocks/Registration/schemes';
import { useForm } from 'react-hook-form';
import { profileFormFields } from './formFields';
import { TextField } from 'components/UI/TextField/TextField';
import { Button } from 'components/UI/Button/Button';
import { type UserInfoEditProps } from './types';

export const UserInfoEdit: FC<UserInfoEditProps> = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
  onBack,
  onSave,
  onChangeUserInfo,
}) => {
  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      dateOfBirth: new Date(dateOfBirth ?? ''),
    },
    resolver: yupResolver(profileFormSchema),
    mode: 'all',
  });

  const { register, formState, getValues } = form;
  const { errors, touchedFields } = formState;

  const onSubmit = () => {
    if (!Object.keys(errors).length && touchedFields.dateOfBirth) {
      onSave();
      onChangeUserInfo(getValues());
    }
  };

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
      <Button className="form__fieldset-button" accent onClick={onSubmit}>
        Save
      </Button>
    </fieldset>
  );
};
