import type React from 'react';

import { type SortingState } from '@tanstack/react-table';

import { type ProjectsHeaderIds } from '~/features/projects/Tables/tables.constants';
import { type ShortProject } from '~/store/api/projects/projects.types';

export type ProjectsTableType = React.FC<{
  data: Array<ShortProject>;
  hasAdminAccess: boolean;
  sorting: SortingState;
  onSortingChange: (sortingState: SortingState) => void;
}>;

export type HeaderKeys =
  (typeof ProjectsHeaderIds)[keyof typeof ProjectsHeaderIds];
