import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Stack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type AppliedEmployeesFilters,
  type EmployeeFilterFormValues,
  EmployeesFiltersSchema
} from '~/features/employees/Filters/employeesFilters.schema';
import { HardSkillField } from '~/features/employees/Filters/Fields/HardSkillField';
import { LanguageField } from '~/features/employees/Filters/Fields/LanguageField';
import { LanguageLevelField } from '~/features/employees/Filters/Fields/LanguageLevelField';
import { NameField } from '~/features/employees/Filters/Fields/NameField';
import { PositionField } from '~/features/employees/Filters/Fields/PositionField';
import { StatusField } from '~/features/employees/Filters/Fields/StatusField';
import { WorkExperienceSection } from '~/features/employees/Filters/Fields/WorkExperienceSection';
import { Button } from '~/shared/ui/components/Button';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';

export const EmployeesFiltersDrawer = ({
  onSubmit
}: {
  onSubmit: (filters: AppliedEmployeesFilters) => void;
}) => {
  const [t] = useTranslation();
  const { data: positions } = useGetPositionsQuery();
  const { data: hardSkills } = useGetHardSkillsQuery();
  const methods = useForm<EmployeeFilterFormValues>({
    defaultValues: {
      employee_name: null,
      position: null,
      hard_skills: null,
      status: null,
      language: null,
      language_level: null,
      work_experience_start: null,
      work_experience_end: null
    },
    mode: 'onBlur',
    resolver: zodResolver(EmployeesFiltersSchema)
  });

  return (
    <FormProvider {...methods}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {t('domains:filters.titles.filter', { count: 100 })}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="20px">
            <NameField />
            <PositionField positions={positions} />
            <HardSkillField hardSkills={hardSkills} />
            <WorkExperienceSection />
            <LanguageField />
            <LanguageLevelField />
            <StatusField />
          </Stack>
        </DrawerBody>
        <DrawerFooter
          display="flex"
          justifyContent="space-between"
        >
          <Button
            variant="primaryGhost"
            disabled={!methods.formState.isDirty}
            onClick={() => methods.reset()}
          >
            {t('domains:filters.actions.reset_filters')}
          </Button>
          <Button
            variant="primaryGhost"
            disabled={!methods.formState.isValid || !methods.formState.isDirty}
            onClick={methods.handleSubmit((data) => {
              const filters = Object.fromEntries(
                Object.entries(data).filter((item) => item[1] !== null)
              );

              onSubmit(filters);
            })}
          >
            {t('domains:filters.actions.apply')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </FormProvider>
  );
};
