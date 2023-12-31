import { Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { GeneralInfoItem } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/GeneralInfoItem';
import { type ChangedProjectMainInfoValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { EditMainInfoModal } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfoModal';
import { toastConfig } from '~/shared/shared.constants';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useUpdateMainInfoMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const MainInfo = ({
  project,
  canEdit
}: {
  project: ProjectResponse;
  canEdit: boolean;
}) => {
  const [t] = useTranslation();
  const {
    isOpen: isOpenMainInfoTab,
    onOpen: onOpenMainInfoTab,
    onClose: onCloseMainInfoTab
  } = useDisclosure();
  const [updateMainInfo, { isLoading }] = useUpdateMainInfoMutation();

  const errorToast = useErrorToast(toastConfig);

  const successToast = useSuccessToast(toastConfig);
  const changeMainInfo = async (values: ChangedProjectMainInfoValues) => {
    try {
      await updateMainInfo({ data: values, id: project.id }).unwrap();
      onCloseMainInfoTab();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      )}
      onEdit={canEdit ? onOpenMainInfoTab : undefined}
    >
      <Flex
        flexDirection="column"
        gap="20px"
      >
        <GeneralInfoItem
          name={t('domains:projects.region')}
          value={
            project.country
              ? project.country.name
              : t('domains:employee.errors.no_data')
          }
        />
        <GeneralInfoItem
          name={t('domains:projects.business_domain')}
          value={
            project.business_domain
              ? t(`enums:business_domains.${project.business_domain}`)
              : t('domains:employee.errors.no_data')
          }
        />
        <GeneralInfoItem
          name={t('domains:projects.service_area')}
          value={
            project.hard_skills && project.hard_skills.length > 0
              ? project.hard_skills.map((item) => item.name).join(', ')
              : t('domains:employee.errors.no_data')
          }
        />
        <GeneralInfoItem
          name={t('domains:projects.description')}
          value={project.description || t('domains:employee.errors.no_data')}
        />
        <GeneralInfoItem
          name={t('domains:projects.challenge')}
          value={project.challenge || t('domains:employee.errors.no_data')}
        />
        <GeneralInfoItem
          name={t('domains:projects.solution')}
          value={project.solution || t('domains:employee.errors.no_data')}
        />
      </Flex>
      <EditMainInfoModal
        project={project}
        isOpenMainInfoTab={isOpenMainInfoTab}
        onCloseMainInfoTab={onCloseMainInfoTab}
        onConfirm={changeMainInfo}
        isLoading={isLoading}
      />
    </InfoSection>
  );
};
