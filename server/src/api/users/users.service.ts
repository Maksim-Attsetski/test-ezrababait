import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { GetUserDto } from './dto/get.dto';
import { Users, UsersDocument } from './users.schema';
import { Deed, DeedDocument } from '../deed/deed.schema';
import {
  Errors,
  changeArray,
  IListForChange,
  FindUtils,
  IQuery,
} from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    @InjectModel(Deed.name) private deedsModel: Model<DeedDocument>,
  ) {}

  async findAll(query: IQuery): Promise<Users[]> {
    return await FindUtils.getAllWithQuery(this.usersModel, query, GetUserDto);
  }

  async findOne(id: string): Promise<Users> {
    const user = await this.usersModel.findById(id);

    if (!user) throw Errors.notFound('User');
    return user;
  }

  async update(id: string, updateUserDto: GetUserDto) {
    const updatedUser = await this.usersModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );

    if (!updatedUser) throw Errors.notFound('User');
    return updatedUser;
  }

  async updateList(id: string, list: IListForChange[]) {
    const user = await this.usersModel.findById(id);

    if (!user) throw Errors.notFound('User');
    await changeArray<Users>(list, GetUserDto, user);
    return user;
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.usersModel.findByIdAndDelete(id);

      if (!deletedUser) throw Errors.notFound('User');
      await this.deedsModel.deleteMany({ authorID: id });
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
