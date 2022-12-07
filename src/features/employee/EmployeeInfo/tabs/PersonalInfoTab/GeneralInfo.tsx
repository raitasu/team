import { useDisclosure } from '@chakra-ui/react';
import upperCase from 'lodash/upperCase';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { isEditable } from '~/features/employee/employee.utils';
import { EditGeneralInfoModal } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo';
import { type ChangedEmployeeGeneralInfoValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type Employee } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { GeneralInfoItem } from './GeneralInfoItem';

export const GeneralInfo = ({ employee }: { employee: Employee }) => {
  const [t, { language }] = useTranslation();
  const {
    isOpen: isOpenGeneralInfoTab,
    onOpen: onOpenGeneralInfoTab,
    onClose: onCloseGeneralInfoTab
  } = useDisclosure();
  const { data: currentUser } = useGetCurrentUserQuery();
  const changeGeneralInfo = (values: ChangedEmployeeGeneralInfoValues) => {
    console.debug(values);
  };

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      )}
      onEdit={
        isEditable(employee.id, currentUser) ? onOpenGeneralInfoTab : undefined
      }
    >
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.gender'
        )}
        value={upperFirst(employee.gender)}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.start_career'
        )}
        value={getFormattedDate(
          employee.start_career_at,
          language,
          DateFormats.Long
        )}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.date_of_birth'
        )}
        value={getFormattedDate(
          employee.date_of_birth,
          language,
          DateFormats.Long
        )}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.about'
        )}
        value={getTranslation(employee.about_translations, language)}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.interests'
        )}
        value={getTranslation(employee.interests_translations, language)}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.clothing_size'
        )}
        value={upperCase(employee.clothing_size)}
      />
      <EditGeneralInfoModal
        employee={employee}
        isOpenGeneralInfoTab={isOpenGeneralInfoTab}
        onCloseGeneralInfoTab={onCloseGeneralInfoTab}
        onConfirm={changeGeneralInfo}
      />
    </InfoSection>
  );
};
