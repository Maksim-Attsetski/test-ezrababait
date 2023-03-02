import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Errors, FindUtils, IQuery } from 'src/utils';
import { Deed } from './deed.schema';
import { GetDeedDto } from './dto/get-deed.dto';

@Injectable()
export class DeedService {
  constructor(
    @InjectModel(Deed.name) private readonly deedModel: Model<Deed>,
  ) {}

  async findAll(query: IQuery): Promise<Deed> {
    return await FindUtils.getAllWithQuery(this.deedModel, query, GetDeedDto);
  }

  async create(createDeedDto: GetDeedDto) {
    return await this.deedModel.create({
      ...createDeedDto,
      createdAt: Date.now(),
    });
  }

  async findOne(id: string) {
    const deed = await this.deedModel.findById(id);

    if (!deed) throw Errors.notFound('Deed');
    return deed;
  }

  async update(id: string, updateDeedDto: GetDeedDto) {
    const deed = await this.deedModel.findByIdAndUpdate(id, updateDeedDto);

    if (!deed) throw Errors.notFound('Deed');
    return deed;
  }

  async remove(id: string) {
    const deed = await this.deedModel.findByIdAndDelete(id);

    if (!deed) throw Errors.notFound('Deed');
    return deed;
  }
}
