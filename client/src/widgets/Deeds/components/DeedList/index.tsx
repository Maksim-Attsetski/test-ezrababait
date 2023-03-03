import React, { FC, memo, useEffect, useState } from 'react';

import { useDeeds, useUsers } from 'hooks';
import { Button, Gap, List, Loader, Title } from 'UI';
import { IDeed } from 'widgets/Deeds';
import { dateHelper } from 'shared';
import { assets } from 'assets';

import s from './DeedList.module.scss';
import EditDeedModal from '../EditDeedModal';
interface IProps {}

const DeedList: FC<IProps> = () => {
  const { deeds, setSelectedDeed, onGetAllDeeds, onDeleteDeed, deedLoading } =
    useDeeds();
  const { user } = useUsers();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    onGetAllDeeds({ dependencies: true });
  }, []);

  return (
    <div>
      <EditDeedModal isVisible={isEdit} setIsVisible={setIsEdit} />
      {deedLoading && <Loader />}
      <List
        data={deeds}
        containerClassname={s.deedList}
        renderItem={(deed: IDeed) => (
          <div className={s.deedContainer}>
            <div className={s.deed}>
              <div className={s.deedTime}>
                {dateHelper.getTimeString(deed.createdAt)}
              </div>
              <Title className={s.deedTitle} isSubTitle text={deed.title} />
              {deed?.description && deed?.description.length > 0 && (
                <div>
                  <div>Description:</div>
                  <div className={s.deedDescription}>{deed?.description}</div>
                </div>
              )}
              <div>
                <div>Goal:</div>
                <div className={s.deedDescription}>{deed.goal}</div>
              </div>
              <Gap y={5} />
              {typeof deed.authorID !== 'string' && (
                <div>by: {deed.authorID.name}</div>
              )}
            </div>
            {(typeof deed.authorID !== 'string'
              ? deed.authorID?._id === user?._id
              : deed.authorID === user?._id) && (
              <div className={s.btnContainer}>
                <Button
                  className={s.deleteBtn}
                  icon={<assets.pencilSvg size={20} />}
                  onClick={() => {
                    setSelectedDeed(deed);
                    setIsEdit(true);
                  }}
                />
                <Button
                  className={s.deleteBtn}
                  danger
                  icon={<assets.trashSvg size={20} />}
                  onClick={() => onDeleteDeed(deed._id)}
                />
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default memo(DeedList);
