import React, { type FC, useState } from 'react';
import { UserInfoView } from './UserInfoView';
import { UserInfoEdit } from './UserInfoEdit';
import { type UserInfoProps } from './types';

export const UserInfo: FC<UserInfoProps> = ({ userInfo, onChangeUserInfo }) => {
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
