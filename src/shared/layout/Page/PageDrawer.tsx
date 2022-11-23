import React from 'react';

import { Drawer, useDisclosure } from '@chakra-ui/react';

import { type DrawerControl } from '~/shared/layout/Page/page.types';

export const PageDrawer = ({
  children,
  onDrawerClose,
  drawerControl
}: {
  children: React.ReactNode;
  drawerControl: DrawerControl;
  onDrawerClose?: () => void;
}) => {
  const disclosure = useDisclosure();
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const { isOpen, onClose } = disclosure;

  return (
    <>
      {drawerControl(disclosure, triggerRef)}
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={triggerRef}
        onCloseComplete={onDrawerClose}
        variant="filters"
      >
        {children}
      </Drawer>
    </>
  );
};
