import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from 'widgets/App';
import { userReducer } from 'widgets/User';
import { deedReducer } from 'widgets/Deeds';

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  deeds: deedReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
