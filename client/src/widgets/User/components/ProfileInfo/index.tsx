import React, { FC, memo, useEffect, useMemo } from 'react';

import { useUsers } from 'hooks';

import s from './ProfileInfo.module.scss';
import { useParams } from 'react-router-dom';

const ProfileInfo: FC = (props) => {
  const { allUsers, onGetUsers } = useUsers();
  const { _id } = useParams();
  const { user } = useUsers();

  const curUser = useMemo(
    () => (_id ? allUsers.find((el) => el._id === _id) : user),
    [allUsers, _id, user]
  );

  useEffect(() => {
    onGetUsers();
  }, []);

  return (
    <div>
      <div>Name — {curUser?.name}</div>
      <div>Email — {curUser?.email}</div>
      <div>Your tag — {curUser?.tag}</div>
    </div>
  );
};
export default memo(ProfileInfo);
