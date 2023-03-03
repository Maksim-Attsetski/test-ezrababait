import DeedService from './service';
import DeedList from './components/DeedList';
import deedReducer, { actions } from './state'
import CreateDeedForm from './components/CreateDeedForm';
export * from './types';

export { 
  DeedList,
  CreateDeedForm,
  DeedService,
  deedReducer,
  actions
}