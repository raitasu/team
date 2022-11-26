import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LocalStorageKey } from '~/shared/shared.constants';
import { type AuthTokens } from '~/store/api/authentication/authentication.types';
import { type AuthSliceState } from '~/store/slices/authentication/authentication.types';

const initialState: AuthSliceState = {
  isLoggedIn: false
};

export const authenticationSlice = createSlice({
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
    }
  }
});

export const {
  actions: { loggedIn, loggedOut, tokenReceived }
} = authenticationSlice;
