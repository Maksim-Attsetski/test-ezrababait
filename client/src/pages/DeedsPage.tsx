import React, { FC, memo } from 'react';

import { CreateDeedForm, DeedList } from 'widgets/Deeds';

const DeedsPage: FC = () => {
  return (
    <div className='container'>
      <CreateDeedForm />
      <DeedList />
    </div>
  );
};
export default memo(DeedsPage);
