
export interface ILoginInfo {
  tag: string;
  password: string;
}

export interface ICreateUser extends ILoginInfo {
  email: string;
  name: string;
}

export interface IUser extends ICreateUser {
  _id: string;
  friends: string[];
  friendRequests: string[];
  followers: string[];
}
