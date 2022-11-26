import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeLanguage } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';

export const LanguagesInfo = ({
  languages
}: {
  languages: EmployeeLanguage[];
}) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.languages')}
    >
      {languages.map((lang) => (
        <Text key={lang.name}>
          {`${t(`enums:language.${lang.name}`)} `}
          <Text
            as="span"
            color="brand.lightGray"
          >
            {`(${t(`enums:language_level.${lang.level}`)})`}
          </Text>
        </Text>
      ))}
    </InfoSection>
  );
};
