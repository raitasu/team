import React from 'react';

import { Drawer, useDisclosure } from '@chakra-ui/react';

import { PageToolboxContext } from '~/shared/layout/Page/PageToolbox.context';

export const PageDrawer = ({
  children,
  drawerControl
}: {
  children: React.ReactNode;
  drawerControl: React.ReactNode;
}) => {
  const disclosure = useDisclosure();
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const { isOpen, onClose } = disclosure;
  const contextValue = React.useMemo(
    () => ({
      disclosure,
      triggerRef
    }),
    [disclosure, triggerRef]
  );

  return (
    <PageToolboxContext.Provider value={contextValue}>
      {drawerControl}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={triggerRef}
        variant="filters"
      >
        {children}
      </Drawer>
    </PageToolboxContext.Provider>
  );
};
