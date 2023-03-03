import { useAuth, useUsers } from 'hooks';
import React, { FC, memo, useState } from 'react';
import { Button, Modal, Title } from 'UI';
import s from './DeleteAccountBtn.module.scss';

const DeleteAccountBtn: FC = () => {
  const { user, onDeleteUser } = useUsers();
  const { onLogout } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteUserHandle = async () => {
    if (!user?._id) return;

    const isSuccess = await onDeleteUser(user?._id);
    isSuccess && (await onLogout());
  };

  return (
    <div>
      <Modal isVisible={isOpen} setIsVisible={setIsOpen}>
        <Title
          className={s.title}
          isSubTitle
          text='Are you sure you want to delete your account?'
        />
        <Button text='Yes' onClick={deleteUserHandle} />
      </Modal>
      <Button text='Delete' danger onClick={() => setIsOpen(true)} />
    </div>
  );
};
export default memo(DeleteAccountBtn);
