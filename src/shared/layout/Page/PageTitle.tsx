import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { PageDrawer } from '~/shared/layout/Page/PageDrawer';

export const PageTitle = ({
  title,
  filterPanelContent,
  onFilterPanelClose,
  onFilterPanelOpen,
  action
}: {
  title: string;
  action?: React.ReactNode;
} & (
  | {
      filterPanelContent: React.ReactNode;
      onFilterPanelClose?: () => void;
      onFilterPanelOpen?: () => void;
    }
  | {
      filterPanelContent?: never;
      onFilterPanelClose?: never;
      onFilterPanelOpen?: never;
    }
)) => (
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
      {filterPanelContent ? (
        <PageDrawer
          onFilterPanelClose={onFilterPanelClose}
          onFilterPanelOpen={onFilterPanelOpen}
        >
          {filterPanelContent}
        </PageDrawer>
      ) : null}
    </Box>
  </Box>
);
