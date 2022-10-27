import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { ProjectsFiltersDrawer } from '~/features/projects/Filters';
import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageTitle } from '~/shared/layout/Page/PageTitle';
import { Button } from '~/shared/ui/components/Button';

export const Projects = () => {
  const [t] = useTranslation();

  return (
    <PageContainer>
      <PageTitle
        title={t('navigation:links.projects')}
        filterPanelContent={<ProjectsFiltersDrawer />}
        action={
          <Button
            variant="primaryOutline"
            leftIcon={<MdAdd />}
          >
            {t('actions:projects.add_project')}
          </Button>
        }
      />
    </PageContainer>
  );
};
