import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { PageDrawerProps } from '~/shared/layout/Page/page.types';
import { PageDrawer } from '~/shared/layout/Page/PageDrawer';

export const PageTitle = ({
  title,
  drawerControl,
  drawerContent,
  onDrawerClose,
  action
}: {
  title: string;
  action?: React.ReactNode;
} & (PageDrawerProps | Partial<Record<keyof PageDrawerProps, never>>)) => (
  <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    padding="60px 0 20px"
  >
    <Heading variant="3">{title}</Heading>
    <Box
      display="flex"
      gap="10px"
    >
      {action}
      {drawerContent ? (
        <PageDrawer
          onDrawerClose={onDrawerClose}
          drawerControl={drawerControl}
        >
          {drawerContent}
        </PageDrawer>
      ) : null}
    </Box>
  </Box>
);
