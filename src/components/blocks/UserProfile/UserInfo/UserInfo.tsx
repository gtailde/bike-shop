import React, { useState } from 'react';
import { UserInfoView } from './UserInfoView';
import { UserInfoEdit } from './UserInfoEdit';
import { type ICustomer } from 'types/types';

export const UserInfo = ({ ...props }: Partial<ICustomer & { birthDate: Date }>) => {
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
