import React from 'react';

import { type UseDisclosureReturn } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { type DrawerControl } from '~/shared/layout/Page/page.types';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

const EmployeesFilterControl = ({
  triggerRef,
  onOpen
}: UseDisclosureReturn & {
  triggerRef?: React.Ref<HTMLButtonElement>;
}) => {
  const [t] = useTranslation();

  return (
    <Tooltip
      hasArrow
      place="left"
      labelText={t('domains:filters.titles.filter', { count: 100 })}
    >
      <ControlButton
        ref={triggerRef}
        aria-label={t('domains:filters.titles.filter', { count: 100 })}
        onClick={onOpen}
        icon={<MdOutlineFilterAlt />}
      />
    </Tooltip>
  );
};

export const createEmployeesFilterControl: DrawerControl = (
  disclosure,
  triggerRef
) => (
  <EmployeesFilterControl
    triggerRef={triggerRef}
    {...disclosure}
  />
);
