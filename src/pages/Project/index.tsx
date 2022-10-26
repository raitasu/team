import { useTranslation } from 'react-i18next';

import { PageContainer } from '~/shared/layout/components/PageContainer';
import { PageTitle } from '~/shared/layout/components/PageTitle';

export const Project = () => {
  const [t] = useTranslation();

  return (
    <PageContainer>
      <PageTitle title={t('navigation:links.project')} />
    </PageContainer>
  );
};
