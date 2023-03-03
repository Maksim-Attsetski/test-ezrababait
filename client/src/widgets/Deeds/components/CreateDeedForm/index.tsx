import React, { FC, memo, useState } from 'react';

import { Button } from 'UI';

import s from './CreateDeedForm.module.scss';

const CreateDeedForm: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        text='Create deed'
        onClick={() => setIsModalOpen((prev) => !prev)}
      />
    </div>
  );
};
export default memo(CreateDeedForm);
