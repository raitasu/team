import { useTranslation } from 'react-i18next';

import { PageContainer } from '~/shared/layout/Page/PageContainer';
import { PageTitle } from '~/shared/layout/Page/PageTitle';

export const Onboarding = () => {
  const [t] = useTranslation();

  return (
    <PageContainer>
      <PageTitle title={t('navigation:links.onboarding')} />
    </PageContainer>
  );
};
