import React, { FC, memo, useEffect, useMemo, useState } from 'react';

import { useDeeds, useUsers } from 'hooks';
import { Button, Gap, List, Loader, Title } from 'UI';
import { IDeed } from 'widgets/Deeds';
import { dateHelper } from 'shared';
import { assets } from 'assets';

import s from './DeedList.module.scss';
import EditDeedModal from '../EditDeedModal';
import DeedsFilter from '../DeedsFilter';
interface IProps {}

const DeedList: FC<IProps> = () => {
  const { deeds, setSelectedDeed, onGetAllDeeds, onDeleteDeed, deedLoading } =
    useDeeds();
  const { user } = useUsers();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [deedFilter, setDeedFilter] = useState<'All' | 'My'>('All');

  const filteredDeed = useMemo(() => {
    switch (deedFilter) {
      case 'All':
        return deeds;
      case 'My':
        return deeds.filter((el) =>
          typeof el.authorID === 'string'
            ? el.authorID === user?._id
            : el.authorID?._id === user?._id
        );
      default:
        return deeds;
    }
  }, [deedFilter, deeds]);

  useEffect(() => {
    if (user) {
      onGetAllDeeds({
        dependencies: true,
        filter: 'authorID_in_' + [...user?.friends, user?._id].join(',') + '',
      });
    }
  }, [user?._id]);

  return (
    <div>
      <Gap y={15} />
      <DeedsFilter deedFilter={deedFilter} setDeedFilter={setDeedFilter} />
      <Gap y={15} />
      <EditDeedModal isVisible={isEdit} setIsVisible={setIsEdit} />
      {deedLoading && <Loader />}
      <List
        data={filteredDeed}
        containerClassname={s.deedList}
        itemClassname={s.deedContainer}
        renderItem={(deed: IDeed) => (
          <>
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
          </>
        )}
      />
    </div>
  );
};
export default memo(DeedList);
