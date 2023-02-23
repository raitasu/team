import { useMemo, useState } from 'react';

import { Grid, Link, Text, useDisclosure } from '@chakra-ui/react';
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH
} from '~/features/employee/employee.styles';
import { isEditable } from '~/features/employee/employee.utils';
import { DateFormats, toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal as ConfirmDeleteModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { getFormattedDate, workPeriod } from '~/shared/utils/dates.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';
import { useRemoveWorkExperienceMutation } from '~/store/api/workExperience/workExperience.api';

import { EditWorkExperienceInfoModal } from './modals/EditWorkExperienceInfo/EditWorkExperienceInfoModal';
import { InfoSection } from '../components/InfoSection';

export const WorkExperienceInfo = ({
  workExperience,
  employeeId,
  hiredAt
}: {
  hiredAt: string;
  workExperience: EmployeeWorkExperience;
  employeeId: number;
}) => {
  const [t, { language }] = useTranslation();
  const { id } = useParams();
  const [isOpenConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
  const [removeWorkExperience, { isLoading: isLoadingDelete }] =
    useRemoveWorkExperienceMutation();
  const { data: currentUser } = useGetCurrentUserQuery();

  const {
    isOpen: isOpenWorkExperienceInfoTab,
    onOpen: onOpenWorkExperienceInfoTab,
    onClose: onCloseWorkExperienceInfoTab
  } = useDisclosure();

  const { months, years } = useMemo(
    () => workPeriod(workExperience.started_at, workExperience.ended_at),
    [workExperience.ended_at, workExperience.started_at]
  );

  const toastError = useErrorToast(toastConfig);

  const toastSuccess = useSuccessToast(toastConfig);

  const deleteWorkExperience = async () => {
    const response = await removeWorkExperience({
      employeesId: String(id),
      workExperienceId: String(workExperience.id)
    });

    if ((response as { error?: FetchBaseQueryError }).error) {
      toastError({
        description: t('domains:employee.errors.unknown_error')
      });
    } else {
      toastSuccess({
        description: t('domains:employee.actions.removed_work_experience')
      });
      onCloseConfirmDeleteModal();
    }
  };

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmModal(false);
  };

  return (
    <InfoSection
      title={
        workExperience.positions.length > 0
          ? workExperience.positions.map((position) => position.name).join(',')
          : t(
              'domains:employee.titles.profile_tabs.work_experience.no_selected_positions'
            )
      }
      onDelete={
        isEditable(employeeId, currentUser)
          ? () => setOpenConfirmModal(true)
          : undefined
      }
      onEdit={
        isEditable(employeeId, currentUser)
          ? onOpenWorkExperienceInfoTab
          : undefined
      }
    >
      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid
          gap="10px"
          alignSelf="start"
        >
          <Text>
            <Link
              as={NavLink}
              to={`/projects/${workExperience.project.id}`}
            >{`${workExperience.project.name} `}</Link>
            ({workExperience.company_name})
          </Text>
          <Text color="brand.lightGray">
            {`${getFormattedDate(
              workExperience.started_at,
              language,
              DateFormats.Short
            )} - ${
              workExperience.ended_at
                ? getFormattedDate(
                    workExperience.ended_at,
                    language,
                    DateFormats.Short
                  )
                : `${t(`domains:employee.titles.present`)} `
            }`}
          </Text>
          <Text color="brand.lightGray">
            {`(${
              years
                ? t('domains:employee.titles.experience', {
                    count: years
                  })
                : ''
            } ${t('domains:employee.titles.experience_month', {
              count: months
            })})`}
          </Text>
        </Grid>
        <Grid rowGap="10px">
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.description'
              )}: `}
            </Text>
            {workExperience.description}
          </Text>
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.responsibilities'
              )}: `}
            </Text>
            {workExperience.responsibilities}
          </Text>
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.environment'
              )}: `}
            </Text>
            {workExperience.hard_skills.map((item) => `${item.name}; `)}
          </Text>
        </Grid>
      </Grid>
      <ConfirmDeleteModal
        title={t('domains:global.confirmations.titles.delete_work_experience')}
        description={t(
          'domains:global.confirmations.descriptions.delete_work_experience'
        )}
        onConfirm={() =>
          workExperience.id
            ? deleteWorkExperience()
            : toastError({
                description: t(
                  'domains:global.errors.descriptions.unknown_error'
                )
              })
        }
        isOpen={isOpenConfirmModal}
        onClose={() => onCloseConfirmDeleteModal()}
        isLoading={isLoadingDelete}
      />
      <EditWorkExperienceInfoModal
        hiredAt={hiredAt}
        workExperience={workExperience}
        isOpenWorkExperienceInfoTab={isOpenWorkExperienceInfoTab}
        onCloseWorkExperienceInfoTab={onCloseWorkExperienceInfoTab}
      />
    </InfoSection>
  );
};
