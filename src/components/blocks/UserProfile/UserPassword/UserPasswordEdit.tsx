import { Button } from 'components/UI/Button/Button';
import { TextField } from 'components/UI/TextField/TextField';
import React from 'react';

export const UserPasswordEdit = ({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) => {
  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">User password</legend>
        <Button onClick={onBack}>Back</Button>
      </p>
      <div className="form__fieldset-content form__fieldset-content--stack">
        <TextField type="password" label={'Current password'} name={'current-password'}></TextField>
        <TextField type="password" label={'New password'} name={'new-password'}></TextField>
      </div>
      <Button className="form__fieldset-button" accent onClick={onSave}>
        Save
      </Button>
    </fieldset>
  );
};
