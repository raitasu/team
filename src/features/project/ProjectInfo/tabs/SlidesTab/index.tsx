import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const SlidesTab = ({ project }: { project: ProjectResponse }) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      )}
    >
      {`${project.name || 'Project'} slides`}
    </InfoSection>
  );
};
