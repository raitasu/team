import { useEffect } from 'react';

import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Stack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import isEmpty from 'lodash/isEmpty';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type EmployeeFilterFormValues,
  EmployeesFiltersSchema,
  initialFilterValues
} from '~/features/employees/Filters/employeesFilters.schema';
import { EmployeesFiltersFooter } from '~/features/employees/Filters/EmployeesFiltersFooter';
import { HardSkillField } from '~/features/employees/Filters/Fields/HardSkillField';
import { LanguageField } from '~/features/employees/Filters/Fields/LanguageField';
import { LanguageLevelField } from '~/features/employees/Filters/Fields/LanguageLevelField';
import { NameField } from '~/features/employees/Filters/Fields/NameField';
import { PositionField } from '~/features/employees/Filters/Fields/PositionField';
import { StatusField } from '~/features/employees/Filters/Fields/StatusField';
import { WorkExperienceSection } from '~/features/employees/Filters/Fields/WorkExperienceSection';
import { useGetHardSkillsQuery } from '~/store/api/hardSkills/hardSkills.api';
import { useGetPositionsQuery } from '~/store/api/positions/positions.api';
import { selectEmployeesFilters } from '~/store/slices/employees/employees.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const EmployeesFiltersDrawer = () => {
  const [t] = useTranslation();
  const { data: positions } = useGetPositionsQuery();
  const { data: hardSkills } = useGetHardSkillsQuery();
  const appliedFilters = useAppSelector(selectEmployeesFilters);

  const methods = useForm<EmployeeFilterFormValues>({
    defaultValues: initialFilterValues,
    mode: 'onBlur',
    resolver: zodResolver(EmployeesFiltersSchema)
  });

  const { reset } = methods;

  useEffect(() => {
    if (!isEmpty(appliedFilters)) {
      reset(
        { ...initialFilterValues, ...appliedFilters },
        { keepDefaultValues: true }
      );
    }
  }, [reset, appliedFilters]);

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
        <EmployeesFiltersFooter />
      </DrawerContent>
    </FormProvider>
  );
};
