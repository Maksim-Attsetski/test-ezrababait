import { useDeeds, useInput, useUsers } from 'hooks';
import React, { FC, FormEvent, memo, useEffect, useState } from 'react';

import { Button, Gap, Input, Modal, Title } from 'UI';
import { IDeed } from 'widgets/Deeds/types';

import s from './CreateDeedForm.module.scss';

const CreateDeedForm: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const { onAddDeed } = useDeeds();
  const { user } = useUsers();

  const title = useInput('', 'Deed title');
  const description = useInput('', 'Deed Description (optional)');
  const goal = useInput('', 'What is your goal?');

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?._id) {
      await onAddDeed({
        authorID: user._id,
        description: description.value,
        goal: goal.value,
        title: title.value,
      } as IDeed);
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    title.onClear();
    description.onClear();
    goal.onClear();
  };

  useEffect(() => {
    setIsDisabled(title.value.length === 0 || goal.value.length === 0);
  }, [title.value, description.value, goal.value]);

  return (
    <div>
      <Modal
        onClose={onCloseModal}
        isVisible={isModalOpen}
        setIsVisible={setIsModalOpen}
      >
        <div className={s.formWrapper}>
          <Title text='Create you Good deed' />
          <form onSubmit={onFormSubmit} className={s.form}>
            <Input {...title.props} />
            <Input {...description.props} />
            <Input {...goal.props} />
            <Gap y={2} />
            <Button
              text='Confirm'
              disabled={isDisabled}
              className={s.formBtn}
            />
          </form>
        </div>
      </Modal>
      <Button
        text='Create deed'
        onClick={() => setIsModalOpen((prev) => !prev)}
      />
    </div>
  );
};
export default memo(CreateDeedForm);
