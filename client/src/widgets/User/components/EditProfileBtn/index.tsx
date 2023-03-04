import { useInput, useUsers } from 'hooks';
import React, { FC, FormEvent, memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, Modal, Title } from 'UI';
import { IUser } from 'widgets/User';

import s from './EditProfileBtn.module.scss';

const EditProfileBtn: FC = () => {
  const { user, onEditUser } = useUsers();
  const { _id } = useParams();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const tag = useInput(user?.tag, 'Input new tag');
  const name = useInput(user?.name, 'Input new name');
  const email = useInput(user?.email, 'Input new email');

  const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?._id) return;

    const values = { tag, name, email };
    const result = {} as IUser;

    for (const k in values) {
      const key = k as keyof typeof values;
      if (values[key].value.length > 0 && values[key].value !== user[key]) {
        result[key] = values[key].value;
      }
    }
    if (Object.keys(result).length > 0) {
      await onEditUser(user?._id, result);
      setIsVisible(false);
    } else {
      setErrorText('Input another values');
    }
  };

  useEffect(() => {
    setErrorText('');
  }, [tag.value, name.value, email.value]);

  return _id ? null : (
    <div>
      <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
        <form onSubmit={onFormSubmit} className={s.form}>
          <Title text='Edit your profile' />
          <Input {...tag.props} />
          <Input {...name.props} />
          <Input {...email.props} type='email' />
          <Button text='Confirm' className={s.formBtn} type='submit' />
        </form>
        {errorText && <div className={s.error}>Error: {errorText}</div>}
      </Modal>
      <Button text='Edit' onClick={() => setIsVisible(true)} />
    </div>
  );
};
export default memo(EditProfileBtn);
