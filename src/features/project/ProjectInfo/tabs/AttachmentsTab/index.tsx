import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const AttachmentsTab = ({ project }: { project: ProjectResponse }) => (
  <div>AttachmentsTab{project.name || ''}</div>
);
