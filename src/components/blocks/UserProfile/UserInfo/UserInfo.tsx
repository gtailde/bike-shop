import React, { useState } from 'react';
import { UserInfoView } from './UserInfoView';
import { UserInfoEdit } from './UserInfoEdit';
import { type ICustomer } from 'types/types';
import { type CustomerData } from '../types';

interface UserInfoProps {
  onChangeUserInfo: (customerData: CustomerData) => void;
  userInfo?: Partial<ICustomer & { dateOfBirth: string }>;
}

export const UserInfo = ({ userInfo, onChangeUserInfo }: UserInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  if (isEditMode) {
    return (
      <UserInfoEdit
        onBack={() => setIsEditMode(false)}
        onSave={() => setIsEditMode(false)}
        onChangeUserInfo={onChangeUserInfo}
        {...userInfo}
      />
    );
  }
  return <UserInfoView {...userInfo} onEdit={() => setIsEditMode(true)} />;
};
