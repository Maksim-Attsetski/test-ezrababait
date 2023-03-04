import DeleteAccountBtn from './components/DeleteAccountBtn';
import EditAccountBtn from './components/EditProfileBtn';
import ProfileInfo from './components/ProfileInfo';
import UserSearch from './components/UserSearch';

import userService from './service';
export * from './types';
import userReducer, { actions } from './state';

export { 
  ProfileInfo,
  userService,
  userReducer,
  actions,
  DeleteAccountBtn,
  EditAccountBtn,
  UserSearch,
}