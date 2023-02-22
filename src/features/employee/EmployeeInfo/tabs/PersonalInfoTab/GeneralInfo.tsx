import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { GeneralInfoItem } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/GeneralInfoItem';
import { EditGeneralInfoModal } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo';
import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type Employee } from '~/store/api/employees/employees.types';

export const GeneralInfo = ({
  employee,
  canEdit
}: {
  employee: Employee;
  canEdit: boolean;
}) => {
  const [t, { language }] = useTranslation();
  const {
    isOpen: isOpenGeneralInfoTab,
    onOpen: onOpenGeneralInfoTab,
    onClose: onCloseGeneralInfoTab
  } = useDisclosure();

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      )}
      onEdit={canEdit ? onOpenGeneralInfoTab : undefined}
    >
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.gender'
        )}
        value={upperFirst(
          employee.gender
            ? employee.gender
            : t('domains:employee.errors.no_data')
        )}
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.start_career'
        )}
        value={
          employee.hired_at
            ? getFormattedDate(employee.hired_at, language, DateFormats.Long)
            : t('domains:employee.errors.no_data')
        }
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.date_of_birth'
        )}
        value={
          employee.date_of_birth
            ? getFormattedDate(
                employee.date_of_birth,
                language,
                DateFormats.Long
              )
            : t('domains:employee.errors.no_data')
        }
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.about'
        )}
        value={
          employee.about ? employee.about : t('domains:employee.errors.no_data')
        }
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.interests'
        )}
        value={
          employee.interests
            ? employee.interests
            : t('domains:employee.errors.no_data')
        }
      />
      <GeneralInfoItem
        name={t(
          'domains:employee.titles.profile_tabs.personal_information.general.clothing_size'
        )}
        value={
          <Flex
            flexDirection="column"
            gap="10px"
          >
            <Flex>
              {employee.sweat_shirt_size
                ? employee.sweat_shirt_size.toUpperCase()
                : t('domains:employee.errors.no_data')}
              <Text
                color="brand.lightGray"
                ml="4px"
                as="span"
              >
                (
                {t(
                  'domains:employee.titles.profile_tabs.personal_information.general.sweat_shirt_size'
                )}
                )
              </Text>
            </Flex>
            <Flex>
              {employee.t_shirt_size
                ? employee.t_shirt_size.toUpperCase()
                : t('domains:employee.errors.no_data')}
              <Text
                color="brand.lightGray"
                ml="4px"
                as="span"
              >
                (
                {t(
                  'domains:employee.titles.profile_tabs.personal_information.general.t_shirt_size'
                )}
                )
              </Text>
            </Flex>
          </Flex>
        }
      />
      <EditGeneralInfoModal
        employee={employee}
        isOpenGeneralInfoTab={isOpenGeneralInfoTab}
        onCloseGeneralInfoTab={onCloseGeneralInfoTab}
      />
    </InfoSection>
  );
};
