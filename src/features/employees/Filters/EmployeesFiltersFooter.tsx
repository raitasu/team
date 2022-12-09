import { useEffect, useState } from 'react';

import { DrawerFooter } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type EmployeeFilterFormValues,
  initialFilterValues
} from '~/features/employees/Filters/employeesFilters.schema';
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
        disabled={!isDirty}
        onClick={() => reset()}
      >
        {t('domains:filters.actions.reset_filters')}
      </Button>
      <Button
        variant="primaryGhost"
        disabled={!isValid || !hasChanged}
        onClick={handleSubmit((data) => {
          const updatedFilters = Object.fromEntries(
            Object.entries(data).filter((item) => item[1] !== null)
          );

          dispatch(setEmployeesFilters(updatedFilters));
          onClose();
        })}
      >
        {t('domains:filters.actions.apply')}
      </Button>
    </DrawerFooter>
  );
};
