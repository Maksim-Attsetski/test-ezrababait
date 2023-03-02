import { IUser } from '../User';

export interface IAuthUserReponse {
  tokens: string;
  user: IUser;
}
