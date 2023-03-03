import React, { FC } from 'react';

import { useUsers } from 'hooks';

import s from './ProfileInfo.module.scss';

const ProfileInfo: FC = (props) => {
  const { user } = useUsers();
  return (
    <div>
      <div>Name — {user?.name}</div>
      <div>Email — {user?.email}</div>
      <div>Your tag — {user?.tag}</div>
    </div>
  );
};
export default ProfileInfo;
