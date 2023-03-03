import React, {
  FC,
  FormEvent,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { useDeeds, useInput, useUsers } from 'hooks';
import { Button, Gap, Input, Modal, TextArea, Title } from 'UI';
import { IDeed } from 'widgets/Deeds';

import s from './EditDeedModal.module.scss';
interface IProps {
  isVisible: boolean;
  setIsVisible: (val: SetStateAction<boolean>) => void;
}

const EditDeedModal: FC<IProps> = ({ isVisible, setIsVisible }) => {
  const { onEditDeed, selectedDeed, setSelectedDeed } = useDeeds();
  const { user } = useUsers();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const title = useInput(selectedDeed?.title, 'Deed title (optional)');
  const description = useInput(
    selectedDeed?.description,
    'Deed Description (optional)'
  );
  const goal = useInput(selectedDeed?.goal, 'What is your goal? (optional)');

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?._id && selectedDeed?._id) {
      const result = {} as IDeed;
      const values = { description, goal, title };

      for (const key in values) {
        const curKey = key as keyof typeof values;

        if (values[curKey].value.length > 0) {
          result[curKey] = values[curKey].value;
        }
      }

      await onEditDeed(selectedDeed?._id, result);
      onCloseModal();
    }
  };

  const onCloseModal = () => {
    setIsVisible(false);
    title.onClear();
    description.onClear();
    goal.onClear();
    setSelectedDeed(null);
  };

  useEffect(() => {
    setIsDisabled(
      title.value.length === 0 &&
        goal.value.length === 0 &&
        description.value.length === 0
    );
  }, [title.value, description.value, goal.value]);

  return (
    <Modal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onClose={onCloseModal}
    >
      <div className={s.formWrapper}>
        <Title text='Deed edition' />
        <form onSubmit={onFormSubmit} className={s.form}>
          <Input {...title.props} maxLength={40} />
          <TextArea {...description.props} maxLength={200} />
          <TextArea {...goal.props} maxLength={100} />
          <Gap y={2} />
          <Button text='Confirm' disabled={isDisabled} className={s.formBtn} />
        </form>
      </div>
    </Modal>
  );
};
export default memo(EditDeedModal);
