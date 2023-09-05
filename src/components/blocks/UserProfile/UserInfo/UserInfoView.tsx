import React from 'react';
import { Button } from 'components/UI/Button/Button';
import { type ICustomer } from 'types/types';

export const UserInfoView = ({
  firstName,
  lastName,
  email,
  dateOfBirth,
  onEdit,
}: Partial<ICustomer & { dateOfBirth: string; onEdit: () => void }>) => {
  return (
    <fieldset className="form__fieldset">
      <p className="form__fieldset-headline">
        <legend className="form__legend">User profile</legend>
        <Button onClick={onEdit}>Edit</Button>
      </p>
      <dl className="form__fieldset-list">
        <div className="form__fieldset-item">
          <dt>First name</dt>
          <dd>{firstName}</dd>
        </div>
        <div className="form__fieldset-item">
          <dt>Last name</dt>
          <dd>{lastName}</dd>
        </div>
        <div className="form__fieldset-item">
          <dt>Birth date</dt>
          <dd>{dateOfBirth}</dd>
        </div>
        <div className="form__fieldset-item">
          <dt>Email address</dt>
          <dd>{email}</dd>
        </div>
      </dl>
    </fieldset>
  );
};
