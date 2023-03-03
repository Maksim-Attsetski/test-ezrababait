import React, { FC, memo } from 'react';
import { Gap, Title } from 'UI';
import { DeleteAccountBtn, EditAccountBtn, ProfileInfo } from 'widgets/User';

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
      </div>
    </div>
  );
};
export default memo(ProfilePage);
