import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { urlFetchAuthToken } from '../apiUrls';
import { getDeviceID } from '../utilFunctions';

export type AuthState = {
  authToken: string;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  authToken: '',
  isLoggedIn: false,
};

export const fetchAuthToken = createAsyncThunk(
  'Auth/fetchAuthToken',
  async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-deviceid': getDeviceID(),
      },
    };
    const response = await fetch(urlFetchAuthToken(), requestOptions);
    return await response.json();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchAuthToken.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.authToken = action.payload;
        state.isLoggedIn = true;
      }
    );
  },
});

export const selectAuthToken = (state: any) => state.auth.authToken;
export const selectIsUserLoggedIn = (state: any) => state.auth.isLoggedIn;

export default authSlice.reducer;
