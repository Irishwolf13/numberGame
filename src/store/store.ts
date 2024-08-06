// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './numberSlice';
import userReducer from './userSlice';  // Import the new user slice

const store = configureStore({
  reducer: {
    currentNumber: numberReducer,
    user: userReducer,  // Add the user reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;