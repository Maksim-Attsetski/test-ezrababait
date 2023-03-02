import { Users, UsersDocument } from '../users.schema';

export class GetUserDto {
  name: string;
  email: string;
  password: string;
  tag: string;
  friends: Users[];
  followers: Users[];
  friendRequests: Users[];
  createdAt: string;
  _id: string;

  constructor(document: UsersDocument) {
    this.name = document?.name;
    this.email = document?.email;
    this.password = document?.password;
    this.tag = document?.tag;
    this.friends = document?.friends;
    this.followers = document?.followers;
    this.friendRequests = document?.friendRequests;
    this.createdAt = document?.createdAt;
    this._id = document?._id + '';
  }
}
