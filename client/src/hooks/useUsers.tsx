import { useCallback, useMemo } from 'react';
import { getApiError, IListForChange, IQuery } from 'shared';

import { userService, IUser } from 'widgets/User';
import { useTypedSelector } from './redux';
import useActions from './useActions';

const useUsers = () => {
  const { action } = useActions();
  const { user: userState } = useTypedSelector((state) => state);

  const onGetUsers = useCallback(async (query?: IQuery, search?: boolean) => {
    try {
      action.setUserLoading(true);
      const users = await userService.getUsers(query);

      if (!!search) {
        return users;
      }

      action.setUsersAC(users);
    } catch (error) {
      console.log('API ERROR on get users', error);
    } finally {
      action.setUserLoading(false);
    }
  }, []);

  const onCheckUsers = useCallback(async (query?: IQuery) => {
    try {
      action.setUserLoading(true);
      const isExist = await userService.getUsers(query);
      return isExist;
    } catch (error) {
      console.log('API ERROR on check users', error);
    } finally {
      action.setUserLoading(false);
    }
  }, []);

  const onGetOneUser = async (_id: string) => {
    try {
      action.setUserLoading(true);
      const curUser = await userService.getOneUser(_id);

      return curUser;
    } catch (error) {
      console.log('API ERROR on get one', error);
    } finally {
      action.setUserLoading(false);
    }
  };

  const onDeleteUser = async (password: string) => {
    try {
      action.setUserLoading(true);
      if (!userState.user) return;

      const isSuccess = await userService.deleteUser(
        userState.user._id,
        password
      );
      return isSuccess;
    } catch (error) {
      console.log('API ERROR on delete account', error);
      throw getApiError(error);
    } finally {
      action.setUserLoading(false);
    }
  };

  const onEditUser = async (_id: string, user: IUser) => {
    try {
      action.setUserLoading(true);
      if (!userState.user) return;

      const isSuccess = await userService.edit(userState.user._id, user);
      action.changeUserAC({ ...userState.user, ...user });
      return isSuccess;
    } catch (error) {
      console.log('API ERROR on edit account', error);
      throw getApiError(error);
    } finally {
      action.setUserLoading(false);
    }
  };
  const onEditUserFields = async (
    _id: string,
    data: IListForChange<IUser>[],
    isMe?: boolean
  ) => {
    try {
      action.setUserLoading(true);
      if (!userState.user) return;

      const updatedUser = await userService.editList(_id, data);
      isMe && action.changeUserfieldsAC(data);
      return updatedUser;
    } catch (error) {
      console.log('API ERROR on edit account', error);
      throw getApiError(error);
    } finally {
      action.setUserLoading(false);
    }
  };

  return {
    ...userState,
    onGetUsers,
    onGetOneUser,
    onDeleteUser,
    onEditUser,
    onEditUserFields,
    onCheckUsers,
  };
};

export default useUsers;
