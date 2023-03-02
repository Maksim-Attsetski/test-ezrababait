import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  isAppLoading: boolean;
  isLoading: boolean;
}

const initialState: IState = {
  isAppLoading: true,
  isLoading: false,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setIsAppLoadingAC: (state: IState, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
    setIsLoadingAC: (state: IState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { actions } = appSlice;
