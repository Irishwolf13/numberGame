// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './numberSlice';

const store = configureStore({
  reducer: {
    currentNumber: numberReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
