import { type Ref, createContext, useContext } from 'react';

import { type UseDisclosureReturn } from '@chakra-ui/react';

type PageToolboxContextValue = {
  disclosure: UseDisclosureReturn;
  triggerRef: Ref<HTMLButtonElement>;
};
export const PageToolboxContext = createContext<PageToolboxContextValue | null>(
  null
);

export const usePageToolboxContext = (): PageToolboxContextValue => {
  const contextValue = useContext(PageToolboxContext);

  if (contextValue === null) {
    throw new Error('Trying to access PageToolboxContext outside provider');
  }

  return contextValue;
};
