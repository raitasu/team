import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { usePageToolboxContext } from '~/shared/layout/Page/PageToolbox.context';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { selectEmployeesFiltersCount } from '~/store/slices/employees/employees.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const EmployeesFilterControl = () => {
  const [t] = useTranslation();
  const isFiltersApplied = useAppSelector(selectEmployeesFiltersCount) > 0;
  const {
    disclosure: { onOpen },
    triggerRef
  } = usePageToolboxContext();

  return (
    <Tooltip
      hasArrow
      place="left"
      labelText={t('domains:filters.titles.filter', { count: 100 })}
    >
      <Box position="relative">
        {isFiltersApplied ? (
          <Box
            sx={{
              position: 'absolute',
              top: '4px',
              right: '14px',
              backgroundColor: 'red',
              width: '8px',
              height: '8px',
              zIndex: 1,
              borderRadius: '9999px'
            }}
          />
        ) : null}
        <ControlButton
          ref={triggerRef}
          aria-label={t('domains:filters.titles.filter', { count: 100 })}
          onClick={onOpen}
          icon={<MdOutlineFilterAlt />}
        />
      </Box>
    </Tooltip>
  );
};
