import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { PageContainer } from '~/shared/layout/components/PageContainer';
import { PageTitle } from '~/shared/layout/components/PageTitle';
import { Button } from '~/shared/ui/components/Button';

export const Projects = () => {
  const [t] = useTranslation();
  return (
    <PageContainer>
      <PageTitle
        title={t('navigation:links.projects')}
        onFilterBtnClick={() => ({})}
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
