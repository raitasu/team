import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector
} from 'react-redux';

import { type AppDispatch, type RootState } from '~/store/store.types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
