import { useCallback, useEffect } from 'react';

import { Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import upperCase from 'lodash/upperCase';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { getChangedDate } from '~/features/employee/EmployeeInfo/tabs/WorkExperienceTab/WorkExperience.utils';
import {
  type EditTeamEmployeeFormValues,
  EditTeamEmployeeSchema
} from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/EditTeamEmployee.schema';
import { getInitialState } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/EditTeamEmployee.utils';
import { PositionSection } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/Fields/PositionSection';
import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { Button } from '~/shared/ui/components/Button';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useUpdateProjectsTeamMutation } from '~/store/api/projects/projects.api';
import { type ProjectTeam } from '~/store/api/projects/projects.types';

export const EditTeamEmployeeModal = ({
  employee,
  projectId,
  isOpenPositionTab,
  onClosePositionTab,
  editMemberTeam,
  setEditMemberTeam
}: {
  employee?: ProjectTeam;
  projectId: number;
  editMemberTeam: number | null;
  setEditMemberTeam: (value: number | null) => void;
  isOpenPositionTab: boolean;
  onClosePositionTab: () => void;
}) => {
  const { t } = useTranslation();
  const [updateProjectsTeam, { isLoading: isLoadingUpdate }] =
    useUpdateProjectsTeamMutation();
  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);
  const workExperiencePositions = useCallback(() => {
    if (employee)
      return employee.work_experience
        .map((item) => item.work_experience_positions)
        .flat();

    return [null];
  }, [employee]);

  const methods = useForm<EditTeamEmployeeFormValues>({
    defaultValues: getInitialState(workExperiencePositions()),
    mode: 'onBlur',
    resolver: zodResolver(EditTeamEmployeeSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'work_experience_positions'
  });

  const { reset } = methods;
  const closePositionForm = () => {
    reset();
    onClosePositionTab();
  };

  useEffect(() => {
    reset(getInitialState(workExperiencePositions()), {
      keepDefaultValues: false
    });
  }, [reset, workExperiencePositions]);

  return (
    <BaseModal
      autoFocus={false}
      title={
        employee
          ? upperCase(`${employee.first_name} ${employee.last_name}`)
          : ''
      }
      isOpen={isOpenPositionTab}
      onClose={closePositionForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closePositionForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit(async (data) => {
            const dataValue = data.work_experience_positions;
            const initialValue = getInitialState(
              workExperiencePositions()
            ).work_experience_positions;

            const deletedExperience = initialValue
              .filter((item) => !dataValue.some((el) => el.id === item.id))
              .map((item) => ({
                id: item.id,
                _destroy: null
              }));

            const updateData = dataValue.map((item) => ({
              end_date:
                item.end_date.month !== null && item.end_date.year
                  ? getChangedDate(
                      Number(item.end_date.year),
                      Number(item.end_date.month)
                    )
                  : null,
              start_date: getChangedDate(
                Number(item.start_date.year),
                Number(item.start_date.month)
              ),
              position_id: item.position_id,
              work_experience_id: item.work_experience_id,
              id: item.id
            }));

            if (editMemberTeam === null) {
              return;
            }

            setEditMemberTeam(null);

            try {
              await updateProjectsTeam({
                data: {
                  work_experience_positions: [
                    ...updateData,
                    ...deletedExperience
                  ]
                },
                projectId
              }).unwrap();
              successToast({
                description: t(
                  'domains:global.confirmations.descriptions.deleted'
                )
              });
              setEditMemberTeam(null);
            } catch (e) {
              console.error(e);
              errorToast({
                description: t(
                  'domains:global.errors.descriptions.unknown_error'
                )
              });
            }
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoadingUpdate}
        />
      }
    >
      <Grid
        flexDirection="column"
        gap="20px"
      >
        <FormProvider {...methods}>
          <Flex
            flexDirection="column"
            gap="20px"
          >
            {fields.map((field, index) => (
              <PositionSection
                fields={fields}
                remove={remove}
                key={field.id}
                index={index}
              />
            ))}

            <Flex justifyContent="flex-start">
              <Button
                variant="primaryGhost"
                leftIcon={<MdAdd />}
                onClick={() =>
                  append({
                    end_date: {
                      month: null,
                      year: null
                    },
                    start_date: {
                      month: null,
                      year: null
                    },
                    position_id: null,
                    work_experience_id:
                      workExperiencePositions()[0]?.work_experience_id
                  })
                }
              >
                {t(
                  'domains:employee.titles.profile_tabs.work_experience.position'
                )}
              </Button>
            </Flex>
          </Flex>
        </FormProvider>
      </Grid>
    </BaseModal>
  );
};
