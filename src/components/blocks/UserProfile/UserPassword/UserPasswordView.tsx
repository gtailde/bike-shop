import { Button } from 'components/UI/Button/Button';
import React from 'react';

export const UserPasswordView = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">User password</legend>
        <Button onClick={onEdit}>Edit</Button>
      </p>
    </fieldset>
  );
};
