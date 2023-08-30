import React, { useState } from 'react';
import { UserInfoView } from './UserInfoView';
import { UserInfoEdit } from './UserInfoEdit';
import { type ICustomer } from 'types/types';

export interface IUserInfoProps
  extends Partial<Pick<ICustomer, 'firstName' | 'lastName' | 'email' | 'password'>> {
  birthDate: string;
}

export const UserInfo = ({ ...props }: IUserInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  if (isEditMode) {
    return (
      <UserInfoEdit
        onBack={() => setIsEditMode(false)}
        onSave={() => setIsEditMode(false)}
        {...props}
      />
    );
  }
  return <UserInfoView {...props} onEdit={() => setIsEditMode(true)} />;
};
