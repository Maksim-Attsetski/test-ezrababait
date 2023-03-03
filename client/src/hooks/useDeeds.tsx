import { useState } from 'react';
import { getApiError, IQuery } from 'shared';
import { DeedService, ICreateDeed, IDeed } from 'widgets/Deeds';
import { useTypedSelector } from './redux';
import useActions from './useActions';

const useDeeds = () => {
  const { deeds, selectedDeed } = useTypedSelector((state) => state.deeds);
  const { action } = useActions();
  const [deedLoading, setDeedLoading] = useState<boolean>(false);

  const onGetAllDeeds = async (query?: IQuery) => {
    try {
      setDeedLoading(true);

      const deeds = await DeedService.getAll(query);
      action.setDeedsAC(deeds);
    } catch (error) {
      throw getApiError(error);
    } finally {
      setDeedLoading(false);
    }
  };
  const onGetOneDeed = async (_id: string) => {
    try {
      setDeedLoading(true);

      const deed = await DeedService.get(_id);
      action.setSelectedDeedAC(deed);
    } catch (error) {
      throw getApiError(error);
    } finally {
      setDeedLoading(false);
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
    deedLoading,
    selectedDeed,
    setSelectedDeed: action.setSelectedDeedAC,
    onAddDeed,
    onDeleteDeed,
    onEditDeed,
    onGetAllDeeds,
    onGetOneDeed,
  };
};
export default useDeeds;
