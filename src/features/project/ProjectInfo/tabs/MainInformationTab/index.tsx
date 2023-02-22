import { MainInfo } from '~/features/project/ProjectInfo/tabs/MainInformationTab/MainInfo';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const MainInformationTab = ({
  project
}: {
  project: ProjectResponse;
}) => <MainInfo project={project} />;
