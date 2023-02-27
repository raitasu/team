import type React from 'react';

import { type ProjectResponse } from '~/store/api/projects/projects.types';

export type ProjectInfoTab = React.FC<{
  project: ProjectResponse;
  canEdit: boolean;
}>;
