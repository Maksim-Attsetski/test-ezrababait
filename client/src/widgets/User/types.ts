
export interface ICreateUser {
  email: string;
  tag: string;
  name: string;
  password: string;
}

export interface IUser extends ICreateUser {
  _id: string;
  friends: string[];
  friendRequests: string[];
  followers: string[];
}
