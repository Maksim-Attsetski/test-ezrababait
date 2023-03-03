import { useState } from 'react';
import { getApiError, IQuery } from 'shared';
import { DeedService, ICreateDeed, IDeed } from 'widgets/Deeds';
import { useTypedSelector } from './redux';
import useActions from './useActions';

const useDeeds = () => {
  const { deeds } = useTypedSelector((state) => state.deeds);
  const [deed, setDeed] = useState<null | IDeed>(null);
  const { action } = useActions();

  const onGetAllDeeds = async (query?: IQuery) => {
    try {
      const deeds = await DeedService.getAll(query);
      action.setDeedsAC(deeds);
    } catch (error) {
      throw getApiError(error);
    }
  };
  const onGetOneDeed = async (_id: string) => {
    try {
      const deed = await DeedService.get(_id);
      setDeed(deed);
    } catch (error) {
      throw getApiError(error);
    }
  };
  const onAddDeed = async (deed: ICreateDeed) => {
    try {
      const createdDeed = await DeedService.create(deed);
      action.addDeedAC(createdDeed);
    } catch (error) {
      throw getApiError(error);
    }
  };
  const onEditDeed = async (_id: string, deed: IDeed) => {
    try {
      await DeedService.edit(_id, deed);
      action.editDeedAC({ ...deed, _id });
    } catch (error) {
      throw getApiError(error);
    }
  };
  const onDeleteDeed = async (_id: string) => {
    try {
      await DeedService.delete(_id);
      action.deleteDeedAC(_id);
    } catch (error) {
      throw getApiError(error);
    }
  };

  return {
    deeds,
    deed,
    onAddDeed,
    onDeleteDeed,
    onEditDeed,
    onGetAllDeeds,
    onGetOneDeed,
  };
};
export default useDeeds;
