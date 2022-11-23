import upperCase from 'lodash/upperCase';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { getTranslation } from '~/services/i18n/i18n.utils';
import { type Employee } from '~/shared/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { GeneralInfoItem } from './GeneralInfoItem';

export const GeneralInfo = ({ employee }: { employee: Employee }) => {
  const [t, { language }] = useTranslation();

  return (
    <InfoSection
      title={t(
        'titles:employee.tabs.personal_information.general.section_title'
      )}
    >
      <GeneralInfoItem
        name={t('titles:employee.tabs.personal_information.general.gender')}
        value={upperFirst(employee.gender)}
      />
      <GeneralInfoItem
        name={t(
          'titles:employee.tabs.personal_information.general.start_career'
        )}
        value={employee.start_career_at}
      />
      <GeneralInfoItem
        name={t(
          'titles:employee.tabs.personal_information.general.date_of_birth'
        )}
        value={employee.date_of_birth}
      />
      <GeneralInfoItem
        name={t('titles:employee.tabs.personal_information.general.about')}
        value={getTranslation(employee.about_translations, language)}
      />
      <GeneralInfoItem
        name={t('titles:employee.tabs.personal_information.general.interests')}
        value={getTranslation(employee.interests_translations, language)}
      />
      <GeneralInfoItem
        name={t(
          'titles:employee.tabs.personal_information.general.clothing_size'
        )}
        value={upperCase(employee.clothing_size)}
      />
    </InfoSection>
  );
};
