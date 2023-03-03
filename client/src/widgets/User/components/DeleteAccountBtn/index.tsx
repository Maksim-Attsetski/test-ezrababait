import { useUsers } from 'hooks';
import React, { FC, memo, useState } from 'react';
import { Button, Modal, Title } from 'UI';
import s from './DeleteAccountBtn.module.scss';

const DeleteAccountBtn: FC = () => {
  const { user, onDeleteUser } = useUsers();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteUserHandle = async () => {
    if (!user?._id) return;

    await onDeleteUser(user?._id);
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
