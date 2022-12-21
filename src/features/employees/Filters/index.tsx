import { useEffect } from 'react';

import {
  Box,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Stack
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import isEmpty from 'lodash/isEmpty';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import {
  type EmployeeFilterFormValues,
  EmployeeFiltersFormSchema,
  initialFilterValues
} from '~/features/employees/Filters/employeeFiltersForm.schema';
import { EmployeesFiltersFooter } from '~/features/employees/Filters/EmployeesFiltersFooter';
import { CountryField } from '~/features/employees/Filters/Fields/CountryField';
import { HardSkillField } from '~/features/employees/Filters/Fields/HardSkillField';
import { LanguageSection } from '~/features/employees/Filters/Fields/LanguageSection';
import { NameField } from '~/features/employees/Filters/Fields/NameField';
import { PositionField } from '~/features/employees/Filters/Fields/PositionField';
import { StatusField } from '~/features/employees/Filters/Fields/StatusField';
import { WorkExperienceSection } from '~/features/employees/Filters/Fields/WorkExperienceSection';
import { Button } from '~/shared/ui/components/Button';
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
    resolver: zodResolver(EmployeeFiltersFormSchema)
  });
  const { fields, append } = useFieldArray({
    control: methods.control,
    name: 'languages'
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
            {fields.map((field, index) => (
              <LanguageSection
                key={field.id}
                index={index}
              />
            ))}
            <Box>
              <Button
                leftIcon={<MdAdd />}
                variant="secondaryGhost"
                onClick={() => append({ name: null, level: null })}
              >
                {t('domains:filters.language')}
              </Button>
            </Box>
            <CountryField />
            <StatusField />
          </Stack>
        </DrawerBody>
        <EmployeesFiltersFooter />
      </DrawerContent>
    </FormProvider>
  );
};
