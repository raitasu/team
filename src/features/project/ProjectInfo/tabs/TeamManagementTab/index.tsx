import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const TeamManagementTab = ({
  project
}: {
  project: ProjectResponse;
}) => <div>TeamManagementTab {project.name || ''}</div>;
