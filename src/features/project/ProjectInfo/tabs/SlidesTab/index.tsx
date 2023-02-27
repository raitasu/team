import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { type ProjectInfoTab } from '~/features/project/ProjectInfo/projectInfo.types';

export const SlidesTab: ProjectInfoTab = ({ project }) => {
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
