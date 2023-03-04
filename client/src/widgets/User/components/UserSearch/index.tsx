import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDebounce, useUsers } from 'hooks';
import { Button, Gap, Input, Line, List, Title } from 'UI';
import { IUser } from 'widgets/User';
import { assets } from 'assets';
import { routeNames } from 'navigation/types';

import s from './UserSearch.module.scss';

const UserSearch: FC = () => {
  const { onGetUsers, user: authUser } = useUsers();
  const navigate = useNavigate();
  const { value, setValue } = useDebounce('', onCheckUsers);

  const [searchUsers, setSearchUsers] = useState<IUser[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  async function onCheckUsers() {
    if (!authUser) return;

    const userList =
      (await onGetUsers(
        { search: 'tag==' + value, filter: '_id!=' + authUser._id, limit: 5 },
        true
      )) || [];
    setSearchUsers(userList);
  }

  const onOpenUser = (_id: string) => {
    navigate(routeNames.Profile + '/' + _id);
    onInputBlur();
  };

  const onInputFocus = () => {
    setIsFocused(true);
  };

  const onInputBlur = () => {
    setIsFocused(false);
    setValue('');
  };

  useEffect(() => {
    const onDocumentClick = (ev: any) => {
      if (!isFocused) return;
      const parentClassList = ev?.target?.offsetParent?.classList;

      const contain = [s.container, s.user, s.inputContainer].some(
        (className) => parentClassList.contains(className)
      );

      !contain && onInputBlur();
    };

    document.body.addEventListener('click', onDocumentClick);
    return () => {
      document.body.removeEventListener('click', onDocumentClick);
    };
  }, [isFocused]);

  useEffect(() => {
    onCheckUsers();
  }, [authUser?._id]);

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <Input
          className={[s.input, isFocused ? s.active : ''].join(' ')}
          onFocus={onInputFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Find friens'
        />
        <assets.searchSvg
          className={s.inputContainerIcon}
          onClick={onInputFocus}
        />
      </div>
      <div>
        {isFocused && (
          <List
            containerClassname={s.userList}
            itemClassname={s.user}
            data={searchUsers}
            renderItem={(user: IUser, inx: number) => (
              <div>
                <Button
                  text='Open'
                  className={s.userBtn}
                  onClick={() => onOpenUser(user._id)}
                />
                <Title text={user.name} isSubTitle />
                <Gap y={5} />
                <div className={s.userTag}>{user.tag}</div>
                {searchUsers.length - 1 !== inx && <Line />}
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};
export default memo(UserSearch);
