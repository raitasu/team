import React from 'react';

import { Box } from '@chakra-ui/react';

import { HEADER_HEIGHT } from '~/shared/layout/layout.constants';
import { PageDrawerProps } from '~/shared/layout/Page/page.types';
import { PageDrawer } from '~/shared/layout/Page/PageDrawer';

export const PageToolbox = ({
  drawerControl,
  drawerContent,
  onDrawerClose,
  action
}: {
  action?: React.ReactNode;
} & (PageDrawerProps | Partial<Record<keyof PageDrawerProps, never>>)) => (
  <Box
    bg="white"
    borderColor="brand.stroke"
    borderRadius="4px 0 0 4px"
    borderStyle="solid"
    borderWidth="1px 0 1px 1px"
    display="flex"
    flexDirection="column"
    gap="10px"
    height="88px"
    justifyContent="center"
    position="fixed"
    top={`calc(${HEADER_HEIGHT} + 40px)`}
    right="0"
  >
    {drawerContent ? (
      <PageDrawer
        onDrawerClose={onDrawerClose}
        drawerControl={drawerControl}
      >
        {drawerContent}
      </PageDrawer>
    ) : null}
    {action}
  </Box>
);
