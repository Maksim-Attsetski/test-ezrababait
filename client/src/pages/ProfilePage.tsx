import React, { FC, memo } from 'react';
import { Gap, Title } from 'UI';
import {
  DeleteAccountBtn,
  EditAccountBtn,
  FriendsBtn,
  ProfileInfo,
} from 'widgets/User';

const ProfilePage: FC = () => {
  return (
    <div className='container'>
      <Title text='Profile' />
      <Gap y={7} />
      <ProfileInfo />
      <Gap y={7} />
      <div className='flex'>
        <DeleteAccountBtn />
        <EditAccountBtn />
        <FriendsBtn />
      </div>
    </div>
  );
};
export default memo(ProfilePage);
