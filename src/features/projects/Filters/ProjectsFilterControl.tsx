import React from 'react';

import type { UseDisclosureReturn } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import type { DrawerControl } from '~/shared/layout/Page/page.types';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

const ProjectsFilterControl = ({
  triggerRef,
  onOpen
}: UseDisclosureReturn & {
  triggerRef?: React.Ref<HTMLButtonElement>;
}) => {
  const [t] = useTranslation();

  return (
    <Tooltip
      hasArrow
      place="right"
      labelText={t('tooltips:filter')}
    >
      <ControlButton
        ref={triggerRef}
        aria-label={t('tooltips:filter')}
        variant="iconButton"
        onClick={onOpen}
        icon={<MdOutlineFilterAlt />}
      />
    </Tooltip>
  );
};

export const createProjectsFilterControl: DrawerControl = (
  disclosure,
  triggerRef
) => (
  <ProjectsFilterControl
    triggerRef={triggerRef}
    {...disclosure}
  />
);
