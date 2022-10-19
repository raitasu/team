import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AuthSliceState } from '~/features/auth/auth.types';
import { LocalStorageKey } from '~/shared/shared.constants';

const accessToken = localStorage.getItem(LocalStorageKey.AuthToken);

const initialState: AuthSliceState = {
  accessToken
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem(LocalStorageKey.AuthToken, action.payload);
      } else {
        localStorage.removeItem(LocalStorageKey.AuthToken);
      }
    }
  }
});

export const { updateAccessToken } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
