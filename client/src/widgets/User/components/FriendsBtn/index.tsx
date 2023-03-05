import { useUsers } from 'hooks';
import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { IListForChange } from 'shared';
import { Button } from 'UI';
import { IUser } from 'widgets/User';

import s from './FriendsBtn.module.scss';

interface IStatus {
  inFriends?: boolean;
  inFollows?: boolean;
  request?: boolean;
  isNotFriend?: boolean;
}

type TStatusKey = keyof IStatus;

const FriendsBtn: FC = () => {
  const { _id } = useParams();
  const { allUsers, user, onEditUserFields, onGetUsers } = useUsers();

  const curUser: IUser | undefined = useMemo(
    () => (_id ? allUsers.find((el) => el._id === _id) : undefined),
    [_id, allUsers, user]
  );

  const isUserExist = useMemo(() => _id && !!curUser?.email, [curUser, _id]);

  const getList = (
    status: TStatusKey,
    isMe?: boolean
  ): IListForChange<IUser>[] => {
    if (!user?._id || !isUserExist) return [];

    const curId = isMe ? curUser?._id : user._id;

    switch (status) {
      case 'inFriends':
        return [
          { field: 'friends', value: curId, add: false },
          { field: 'followers', value: curId, add: !isMe },
          { field: 'friendRequests', value: curId, add: isMe },
        ];
      case 'inFollows':
        return [
          { field: 'friendRequests', value: curId, add: false },
          { field: 'followers', value: curId, add: false },
        ];
      case 'request':
        return [
          { field: 'friends', value: curId, add: true },
          { field: 'friendRequests', value: curId, add: false },
          { field: 'followers', value: curId, add: false },
        ];
      case 'isNotFriend':
        return [
          { field: 'friendRequests', value: curId, add: !isMe },
          { field: 'followers', value: curId, add: isMe },
        ];
      default:
        return [];
    }
  };

  const onUserEdit = async (status: TStatusKey) => {
    if (curUser && _id && user?._id) {
      const myList: IListForChange<IUser>[] = await getList(status, true);
      const otherList: IListForChange<IUser>[] = await getList(status);

      await onEditUserFields(user?._id, myList, true);
      await onEditUserFields(curUser?._id, otherList);
      await onGetUsers();
    }
  };

  const statuses: IStatus = useMemo(() => {
    if (curUser && user?._id) {
      const { followers, friendRequests, friends } = user;

      const inFriends =
        !!friends.length && friends?.some((el) => el === curUser._id); // в друзьях
      const inFollows =
        !!followers.length && followers?.some((el) => el === curUser._id); // я подписан на него
      const request =
        !!friendRequests.length &&
        friendRequests?.some((el) => el === curUser._id); // я отправил запрос
      const isNotFriend = !inFriends && !inFollows && !request; // добавить в друзья

      return { inFriends, inFollows, request, isNotFriend };
    } else {
      return {};
    }
  }, [_id, curUser, user]);

  return isUserExist ? (
    <div>
      {statuses?.inFriends && (
        <Button text='Remove friend' onClick={() => onUserEdit('inFriends')} />
      )}
      {statuses?.inFollows && (
        <Button text='Unsend request' onClick={() => onUserEdit('inFollows')} />
      )}
      {statuses?.request && (
        <Button text='Accept request' onClick={() => onUserEdit('request')} />
      )}
      {statuses?.isNotFriend && (
        <Button text='Add friend' onClick={() => onUserEdit('isNotFriend')} />
      )}
    </div>
  ) : null;
};

export default FriendsBtn;
