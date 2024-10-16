import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { urlFetchNumbers, urlLockNumber } from '../apiUrls';
import type { NumberConfigOptions } from '../apiUrls';
import { getDeviceID } from '../utilFunctions';

export type NumberSelectionState = {
  numbers: any;
  lockedNumber: Number | null;
};

const initialState: NumberSelectionState = {
  numbers: {},
  lockedNumber: null,
};

export const fetchNumbers = createAsyncThunk(
  'NumberSelection/fetchNumbers',
  async (config: NumberConfigOptions, { getState }) => {
    const state: any = getState();
    const token = state?.auth?.authToken?.result?.accessToken;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token,
      },
      body: JSON.stringify(config),
    };
    const response = await fetch(urlFetchNumbers(), requestOptions);
    return await response.json();
  }
);

export const lockSelectedNumber = createAsyncThunk(
  'NumberSelection/lockSelectedNumber',
  async (selectedNumber: Number, { getState }) => {
    const state: any = getState();
    const token = state?.auth?.authToken?.result?.accessToken;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': token,
        'x-deviceid': getDeviceID(),
      },
      body: JSON.stringify({ number: selectedNumber }),
    };
    const response = await fetch(urlLockNumber(selectedNumber), requestOptions);
    return await response.json();
  }
);

export const numberSelectionSlice = createSlice({
  name: 'numberSelection',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNumbers.fulfilled, (state, action: PayloadAction<any>) => {
        state.numbers = action.payload;
      })
      .addCase(
        lockSelectedNumber.fulfilled,
        (state, action: PayloadAction<any>) => {
          // Update the lockedNumber with the selected number
          state.lockedNumber = action.payload;
        }
      );
  },
});

export const selectAvailableNumbers = (state: any) =>
  state.numberSelection.numbers;
export const selectLockedNumber = (state: any) =>
  state.numberSelection.lockedNumber;

export default numberSelectionSlice.reducer;
