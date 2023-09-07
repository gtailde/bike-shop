import React, { type FC } from 'react';
import * as yup from 'yup';
import { type UserPasswordEditProps } from './types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from 'components/UI/Button/Button';
import { TextField } from 'components/UI/TextField/TextField';
import { passwordSchema } from 'validations/validationSchemes';

export const UserPasswordEdit: FC<UserPasswordEditProps> = ({
  onBack,
  onSave,
  onChangePassword,
}) => {
  const scheme = yup.object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
  });

  const form = useForm({
    resolver: yupResolver(scheme),
    mode: 'all',
  });

  const { register, formState, getValues } = form;
  const { errors, touchedFields } = formState;

  enum FIELD_NAMES {
    CURRENT_PASSWORD = 'currentPassword',
    NEW_PASSWORD = 'newPassword',
  }

  const onSubmit = () => {
    if (!Object.keys(errors).length && Object.keys(touchedFields).length === 2) {
      const { currentPassword, newPassword } = getValues();
      onSave();
      void onChangePassword(currentPassword, newPassword);
    }
  };

  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">User password</legend>
        <Button onClick={onBack}>Back</Button>
      </p>
      <div className="form__fieldset-content form__fieldset-content--stack">
        <TextField
          type="password"
          label={'Current password'}
          isValid={!errors[FIELD_NAMES.CURRENT_PASSWORD]}
          helpText={errors[FIELD_NAMES.CURRENT_PASSWORD]?.message}
          {...register(FIELD_NAMES.CURRENT_PASSWORD)}
        ></TextField>
        <TextField
          type="password"
          label={'New password'}
          isValid={!errors[FIELD_NAMES.NEW_PASSWORD]}
          helpText={errors[FIELD_NAMES.NEW_PASSWORD]?.message}
          {...register(FIELD_NAMES.NEW_PASSWORD)}
        ></TextField>
      </div>
      <Button className="form__fieldset-button" accent onClick={onSubmit}>
        Save
      </Button>
    </fieldset>
  );
};
