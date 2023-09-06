import React, { type FC, useState } from 'react';
import { UserPasswordEdit } from './UserPasswordEdit';
import { UserPasswordView } from './UserPasswordView';
import { type UserPassworsProps } from './types';

export const UserPassword: FC<UserPassworsProps> = ({ onChangePassword }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  if (isEditMode) {
    return (
      <UserPasswordEdit
        onBack={() => setIsEditMode(false)}
        onSave={() => setIsEditMode(false)}
        onChangePassword={onChangePassword}
      />
    );
  }
  return <UserPasswordView onEdit={() => setIsEditMode(true)} />;
};
