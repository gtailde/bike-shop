import React, { useState } from 'react';
import { type ICustomer } from 'types/types';
import { UserPasswordEdit } from './UserPasswordEdit';
import { UserPasswordView } from './UserPasswordView';

export const UserPassword = ({ ...props }: Partial<ICustomer & { birthDate: Date }>) => {
  const [isEditMode, setIsEditMode] = useState(false);
  if (isEditMode) {
    return (
      <UserPasswordEdit onBack={() => setIsEditMode(false)} onSave={() => setIsEditMode(false)} />
    );
  }
  return <UserPasswordView onEdit={() => setIsEditMode(true)} />;
};
