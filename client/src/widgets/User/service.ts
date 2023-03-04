import { IListForChange } from 'shared';
import { $api } from 'shared/services/api';
import { IUser } from './types';

class UserService {
  routes = {
    users: 'users/',
    exist: 'users/exist',
    list: 'users/list/'
  }
  async getUsers(params: any): Promise<IUser[]> {
    const usersData = await $api.get(this.routes.users, { params });
    return usersData.data;
  }
  async checkUsers(params: any): Promise<boolean> {
    const usersData = await $api.get(this.routes.exist, { params });
    return usersData.data;
  }
  async getOneUser(_id: string): Promise<IUser> {
    const userData = await $api.get(this.routes.users + _id);
    return userData.data;
  }
  async edit(_id: string, user: IUser): Promise<IUser> {
    const userData = await $api.patch(this.routes.users + _id, user);
    return userData.data;
  }
  async editList(_id: string, data: IListForChange<IUser>[]): Promise<IUser> {
    const userData = await $api.patch(this.routes.list + _id, data);
    return userData.data;
  }
  async deleteUser(_id: string, password: string): Promise<string> {
    const userData = await $api.delete(this.routes.users + _id, {
      params: { password }
    });
    return userData.data;
  }
}

export default new UserService();
