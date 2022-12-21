import { useEffect, useState } from 'react';

import { DrawerFooter } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type EmployeeFilters,
  type EmployeeFilterFormValues,
  initialFilterValues
} from '~/features/employees/Filters/employeeFiltersForm.schema';
import { usePageToolboxContext } from '~/shared/layout/Page/PageToolbox.context';
import { Button } from '~/shared/ui/components/Button';
import { selectEmployeesFilters } from '~/store/slices/employees/employees.selectors';
import { setEmployeesFilters } from '~/store/slices/employees/employees.slice';
import { useAppDispatch, useAppSelector } from '~/store/store.hooks';

export const EmployeesFiltersFooter = () => {
  const {
    disclosure: { onClose }
  } = usePageToolboxContext();
  const dispatch = useAppDispatch();
  const [t] = useTranslation();
  const {
    formState: { isValid, isDirty },
    handleSubmit,
    watch,
    reset
  } = useFormContext<EmployeeFilterFormValues>();
  const appliedFilters = useAppSelector(selectEmployeesFilters);
  const [hasChanged, setHasChanged] = useState(() => !isEmpty(appliedFilters));

  useEffect(() => {
    const subscription = watch((values) => {
      setHasChanged(
        !isEqual(values, { ...initialFilterValues, ...appliedFilters })
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [appliedFilters, watch]);

  return (
    <DrawerFooter
      display="flex"
      justifyContent="space-between"
    >
      <Button
        variant="primaryGhost"
        isDisabled={!isDirty}
        onClick={() => reset()}
      >
        {t('domains:filters.actions.clear_filters')}
      </Button>
      <Button
        variant="primaryGhost"
        isDisabled={!isValid || !hasChanged}
        onClick={handleSubmit((data) => {
          const appliedFilters: EmployeeFilters = Object.fromEntries(
            Object.entries(data).filter((item) => item[1] !== null)
          );
          const appliedLanguageFilter = appliedFilters.languages?.filter(
            (language) => language.name
          );

          if (appliedLanguageFilter?.length === 0) {
            delete appliedFilters.languages;
          }

          dispatch(setEmployeesFilters(appliedFilters));
          onClose();
        })}
      >
        {t('domains:filters.actions.apply')}
      </Button>
    </DrawerFooter>
  );
};
