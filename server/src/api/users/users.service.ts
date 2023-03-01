import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create.dto';
import { GetUserDto } from './dto/get.dto';
import { Users, UsersDocument } from './users.schema';
import { Errors } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
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

  async remove(id: string) {
    try {
      const deletedUser = await this.usersModel.findByIdAndDelete(id);

      if (!deletedUser) throw Errors.notFound('User');
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }
}
