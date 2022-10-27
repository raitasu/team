import React from 'react';

import { Drawer, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const PageDrawer = ({
  children,
  onFilterPanelClose,
  onFilterPanelOpen
}: {
  children: React.ReactNode;
  onFilterPanelClose?: () => void;
  onFilterPanelOpen?: () => void;
}) => {
  const [t] = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Tooltip
        hasArrow
        place="right"
        labelText={t('tooltips:filter')}
      >
        <IconButton
          ref={btnRef}
          aria-label="Filter"
          variant="iconButton"
          onClick={() => {
            if (onFilterPanelOpen) {
              onFilterPanelOpen();
            }
            onOpen();
          }}
          icon={<MdOutlineFilterAlt />}
        />
      </Tooltip>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        onCloseComplete={onFilterPanelClose}
        variant="filters"
      >
        {children}
      </Drawer>
    </>
  );
};
