import { Text } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import type { EmployeeLanguage } from '~/shared/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';

export const LanguagesInfo = ({
  languages
}: {
  languages: EmployeeLanguage[];
}) => {
  const [t] = useTranslation();

  return (
    <InfoSection title={t('titles:employee.tabs.skills.languages')}>
      {languages.map((lang) => (
        <Text key={lang.name}>
          {`${upperFirst(lang.name)} `}
          <Text
            as="span"
            color="brand.lightGray"
          >
            {`${lang.level}`}
          </Text>
        </Text>
      ))}
    </InfoSection>
  );
};
