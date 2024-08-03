// src/numberSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyNumber } from '../interfaces/interface';

interface NumberState {
  currentNumber: MyNumber | null;
}

const initialState: NumberState = {
    currentNumber: null,
};

const numberSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    setCurrentNumber(state, action: PayloadAction<MyNumber>) {
      state.currentNumber = action.payload;
    },
    clearCurrentNumber(state) {
      state.currentNumber = null;
    },
  },
});

export const { setCurrentNumber, clearCurrentNumber } = numberSlice.actions;

export default numberSlice.reducer;
