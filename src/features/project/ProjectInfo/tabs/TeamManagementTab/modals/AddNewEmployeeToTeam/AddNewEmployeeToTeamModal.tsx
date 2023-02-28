import { useEffect } from 'react';

import { Flex, Grid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { getChangedDate } from '~/features/employee/EmployeeInfo/tabs/WorkExperienceTab/WorkExperience.utils';
import {
  AddNewEmployeeToTeamSchema,
  type ProjectTeamFormValues
} from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeam.schema';
import { getInitialState } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeam.utils';
import { EmployeeSection } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/Fields/EmployeeSection';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { Button } from '~/shared/ui/components/Button';
import { type CreateEmployeeProjects } from '~/store/api/employees/employees.types';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const AddNewEmployeeToTeamModal = ({
  project,
  isOpenTeamTab,
  onCloseTeamTab,
  onConfirm,
  isLoading
}: {
  project: ProjectResponse;
  isOpenTeamTab: boolean;
  onCloseTeamTab: () => void;
  isLoading?: boolean;
  onConfirm: (values: CreateEmployeeProjects) => void;
}) => {
  const { t } = useTranslation();
  const methods = useForm<ProjectTeamFormValues>({
    defaultValues: getInitialState(),
    mode: 'onBlur',
    resolver: zodResolver(AddNewEmployeeToTeamSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'team'
  });
  const { reset } = methods;
  const closeTeamForm = () => {
    methods.reset();
    onCloseTeamTab();
  };

  useEffect(() => {
    reset(getInitialState(), { keepDefaultValues: false });
  }, [reset, project]);

  return (
    <BaseModal
      autoFocus={false}
      title={t('domains:projects.team')}
      isOpen={isOpenTeamTab}
      onClose={closeTeamForm}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeTeamForm}
          onReset={() => methods.reset()}
          onSubmit={methods.handleSubmit((data) => {
            const updatedData = data.team.map((item) => ({
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
              employee_id: item.employee_id
            }));

            onConfirm({ team: updatedData });
          })}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          isLoading={isLoading}
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
              <EmployeeSection
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
                    employee_id: null,
                    end_date: { month: null, year: null },
                    start_date: { month: null, year: null },
                    position_id: []
                  })
                }
              >
                {t('domains:projects.employee')}
              </Button>
            </Flex>
          </Flex>
        </FormProvider>
      </Grid>
    </BaseModal>
  );
};
