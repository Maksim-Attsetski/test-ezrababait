import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types';

type userType = IUser | null;

interface IState {
  user: userType;
  isAuth: boolean;
  allUsers: IUser[];
  usersIsLoading: boolean;
}

const initialState: IState = {
  user: null,
  isAuth: false,
  allUsers: [],
  usersIsLoading: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setIsAuthAC: (state: IState, action: PayloadAction<userType>) => {
      state.isAuth = !!action.payload;
      state.user = action.payload;
    },
    changeUserAC: (state: IState, action: PayloadAction<IUser>) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUsersAC: (state: IState, action: PayloadAction<IUser[]>) => {
      state.allUsers = action.payload;
    },
    setUserLoading: (state: IState, action: PayloadAction<boolean>) => {
      state.usersIsLoading = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { actions } = userSlice;
