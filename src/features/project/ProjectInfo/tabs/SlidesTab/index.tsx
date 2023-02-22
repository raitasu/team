import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const SlidesTab = ({ project }: { project: ProjectResponse }) => (
  <div>SlidesTab{project.name || ''}</div>
);
