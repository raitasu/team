import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type CVSliceState } from '~/store/slices/cv/cv.types';

const getInitialState: () => CVSliceState = () => ({
  blocks: []
});

export const cvSlice = createSlice({
  name: 'cv',
  initialState: getInitialState(),
  reducers: {
    setBlocksVisibility(state, { payload }: PayloadAction<string[]>) {
      state.blocks = payload;
    }
  }
});

export const {
  actions: { setBlocksVisibility }
} = cvSlice;
