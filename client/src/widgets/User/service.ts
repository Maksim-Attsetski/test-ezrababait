import { $api } from 'shared/services/api';

class UserService {
  routes = {
    users: 'users/'
  }
  async getUsers(params: any) {
    const usersData = await $api.get(this.routes.users, { params });
    return usersData.data;
  }
  async getOneUser(_id: string) {
    const userData = await $api.get(this.routes.users + _id);
    return userData.data;
  }
  async deleteUser(_id: string, password: string) {
    const userData = await $api.delete(this.routes.users + _id, {
      params: { password }
    });
    return userData.data;
  }
}

export default new UserService();
