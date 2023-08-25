import React, { useState } from 'react';
import { UserInfoView } from './UserInfoView';
import { UserInfoEdit } from './UserInfoEdit';
import { type ICustomer } from 'types/types';

export interface IUserInfoProps
  extends Partial<Pick<ICustomer, 'firstName' | 'lastName' | 'email'>> {
  birthDate: string; // как дела с датой?
}

export const UserInfo = ({ ...props }: IUserInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return isEditMode ? (
    <UserInfoEdit
      onBack={() => {
        setIsEditMode(false);
      }}
      onSave={() => {
        setIsEditMode(false);
        console.log('not implemented');
      }}
      {...props}
    />
  ) : (
    <UserInfoView
      {...props}
      onEdit={() => {
        setIsEditMode(true);
      }}
    />
  );
};
