import { useCallback, useMemo } from 'react';
import { getApiError } from 'shared';

import { userService, IUser } from 'widgets/User';
import { useTypedSelector } from './redux';
import useActions from './useActions';

const useUsers = () => {
  const { action } = useActions();
  const { user: userState } = useTypedSelector((state) => state);

  const onGetUsers = useCallback(async (query: any = {}, search?: boolean) => {
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

  return { ...userState, onGetUsers, onGetOneUser, onDeleteUser };
};

export default useUsers;