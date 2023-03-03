import { IUser } from 'widgets/User';

export interface ICreateDeed {
  title: string;
  goal: string;
  authorID: string | IUser;
}

export interface IDeed extends ICreateDeed {
  _id: string;  
  createdAt: number;
  description: string;
}
