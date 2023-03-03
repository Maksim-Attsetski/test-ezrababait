import { Users } from 'src/api/users/users.schema';

export class GetDeedDto {
  title: string;
  description: string;
  goal: string;
  authorID: Users[];
  createdAt: number;

  constructor(model: any) {
    this.title = model?.title;
    this.goal = model?.goal;
    this.description = model?.description || '';
    this.authorID = model?.authorID;
    this.createdAt = model?.createdAt;
  }
}
