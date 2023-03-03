import React, { FC, memo, useEffect } from 'react';

import { useDeeds } from 'hooks';
import { List, Title } from 'UI';
import { IDeed } from 'widgets/Deeds';

import s from './DeedList.module.scss';
import { dateHelper } from 'shared';
interface IProps {}

const DeedList: FC<IProps> = () => {
  const { deeds, onGetAllDeeds } = useDeeds();

  useEffect(() => {
    onGetAllDeeds({ dependencies: true });
  }, []);

  return (
    <div>
      <List
        data={deeds}
        renderItem={(deed: IDeed) => (
          <div>
            <Title isSubTitle text={deed.title} />
            <br />
            <div>{dateHelper.getTimeString(deed.createdAt)}</div>
            <div>{deed?.description || ''}</div>
            {typeof deed.authorID !== 'string' && (
              <div>Author: {deed.authorID.name}</div>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default memo(DeedList);
