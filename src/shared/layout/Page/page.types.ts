import React from 'react';

import { UseDisclosureReturn } from '@chakra-ui/react';

export type DrawerControl = (
  disclosure: UseDisclosureReturn,
  triggerRef?: React.Ref<HTMLButtonElement>
) => React.ReactNode;

export interface PageDrawerProps {
  drawerControl: DrawerControl;
  drawerContent: React.ReactNode;
  onDrawerClose?: () => void;
}
