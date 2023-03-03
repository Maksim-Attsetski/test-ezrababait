import { IDeed } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  deeds: IDeed[];
  selectedDeed: IDeed | null;
}

const initialState: IState = {
  deeds: [],
  selectedDeed: null
}

const deedSlice = createSlice({
  name: 'deedsSlice',
  initialState,
  reducers: {
    setDeedsAC: (state: IState, action: PayloadAction<IDeed[]>) => {
      state.deeds = action.payload
    },
    setSelectedDeedAC: (state: IState, action: PayloadAction<IDeed | null>) => {
      state.selectedDeed = action.payload;
    },
    addDeedAC: (state: IState, action: PayloadAction<IDeed>) => {
      state.deeds = [...state.deeds, action.payload]
    },
    editDeedAC: (state: IState, action: PayloadAction<IDeed>) => {
      state.deeds = state.deeds.map((deed) => 
        deed._id === action.payload._id ? { ...deed, ...action.payload } : deed)
    },
    deleteDeedAC: (state: IState, action: PayloadAction<string>) => {
      state.deeds = state.deeds.filter((deed) => deed._id !== action.payload)
    },
  }
})

export const { actions } = deedSlice
export default deedSlice.reducer