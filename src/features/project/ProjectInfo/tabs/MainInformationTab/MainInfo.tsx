import { Flex, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { isEditable } from '~/features/employee/employee.utils';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { GeneralInfoItem } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/GeneralInfoItem';
import { type ChangedProjectMainInfoValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { EditMainInfoModal } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfoModal';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { useUpdateMainInfoMutation } from '~/store/api/projects/projects.api';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const MainInfo = ({ project }: { project: ProjectResponse }) => {
  const [t] = useTranslation();
  const {
    isOpen: isOpenMainInfoTab,
    onOpen: onOpenMainInfoTab,
    onClose: onCloseMainInfoTab
  } = useDisclosure();
  const { data: currentUser } = useGetCurrentUserQuery();
  const { id } = useParams();
  const [updateMainInfo] = useUpdateMainInfoMutation();
  const changeMainInfo = (values: ChangedProjectMainInfoValues) => {
    updateMainInfo({ data: values, id: Number(id) })
      .then(onCloseMainInfoTab)
      .catch(onCloseMainInfoTab);
  };

  return (
    <InfoSection
      title={t(
        'domains:employee.titles.profile_tabs.personal_information.general.section_title'
      )}
      onEdit={
        isEditable(project.id, currentUser) ? onOpenMainInfoTab : undefined
      }
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
      />
    </InfoSection>
  );
};
