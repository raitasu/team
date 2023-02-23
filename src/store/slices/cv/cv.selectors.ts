import { type RootState } from '~/store/store.types';

export const selectCVBlocks = (state: RootState) => state.cv.blocks;
