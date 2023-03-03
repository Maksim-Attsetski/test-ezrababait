import { $api, IQuery } from 'shared';
import { ICreateDeed, IDeed } from './types';

class DeedsService {
  deed = 'deeds';
  deeds = 'deeds/';
  deedList = 'deeds/list';

  async getAll(params?: IQuery): Promise<IDeed[]> {
    const deeds = await $api.get(this.deed, { params });
    return deeds.data;
  }
  async get(_id: string): Promise<IDeed> {
    const deeds = await $api.get(this.deeds + _id);
    return deeds.data;
  }
  async create(deed?: ICreateDeed): Promise<IDeed> {
    const newDeed = await $api.post(this.deeds, deed);
    return newDeed.data;
  }
  async edit(_id: string, deed: IDeed): Promise<IDeed> {
    const updatedDeed = await $api.post(this.deeds + _id, deed);
    return updatedDeed.data;
  }
  async delete(_id: string): Promise<string> {
    const deeds = await $api.delete(this.deeds + _id);
    return deeds.data;
  }
}

export default new DeedsService();