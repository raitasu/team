import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '~/shared/store/store.types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
