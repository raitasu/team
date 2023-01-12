import { Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeLanguage } from '~/store/api/employees/employees.types';

import { type ChangedEmployeeLanguageInfoValues } from './modals/EditLanguagesInfo/EditLanguagesInfo.shema';
import { EditLanguagesInfoModal } from './modals/EditLanguagesInfo/EditLanguagesInfoModal';
import { InfoSection } from '../components/InfoSection';

export const LanguagesInfo = ({
  languages,
  canEdit
}: {
  languages: EmployeeLanguage[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenLanguagesInfoTab,
    onOpen: onOpenLanguagesInfoTab,
    onClose: onCloseLanguagesInfoTab
  } = useDisclosure();

  const changeLanguagesInfo = (values: ChangedEmployeeLanguageInfoValues) => {
    console.debug(values);
  };

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.languages')}
      onEdit={canEdit ? onOpenLanguagesInfoTab : undefined}
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
      <EditLanguagesInfoModal
        languages={languages}
        isOpenLanguagesInfoTab={isOpenLanguagesInfoTab}
        onCloseLanguagesInfoTab={onCloseLanguagesInfoTab}
        onConfirm={changeLanguagesInfo}
      />
    </InfoSection>
  );
};
