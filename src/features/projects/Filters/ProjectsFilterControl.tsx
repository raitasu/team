import React from 'react';

import { UseDisclosureReturn } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { DrawerControl } from '~/shared/layout/Page/page.types';
import { IconButton } from '~/shared/ui/components/IconButton';
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
      <IconButton
        ref={triggerRef}
        aria-label="Filter"
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
