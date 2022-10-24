import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthSliceState } from '~/features/auth/auth.types';
import { LocalStorageKey } from '~/shared/shared.constants';
import { AuthTokens } from '~/shared/store/api/api.types';

const initialState: AuthSliceState = {
  isLoggedIn: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    tokenReceived(_, { payload }: PayloadAction<AuthTokens>) {
      localStorage.setItem(LocalStorageKey.AuthToken, payload.access_token);
      localStorage.setItem(LocalStorageKey.RefreshToken, payload.refresh_token);
    },
    loggedIn(state) {
      state.isLoggedIn = true;
    },
    loggedOut(state) {
      state.isLoggedIn = false;
      localStorage.removeItem(LocalStorageKey.AuthToken);
      localStorage.removeItem(LocalStorageKey.RefreshToken);
    }
  }
});

export const { loggedIn, loggedOut, tokenReceived } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
