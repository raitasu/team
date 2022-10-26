import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { BaseTooltip } from '~/shared/ui/components/Tooltip';

export const PageTitle = ({
  title,
  onFilterBtnClick,
  action
}: {
  title: string;
  action?: React.ReactNode;
  onFilterBtnClick?: () => void;
}) => {
  const [t] = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="60px 0 20px"
    >
      <Heading variant="3">{title}</Heading>
      <Box>
        {action}
        {onFilterBtnClick ? (
          <BaseTooltip
            hasArrow
            place="right"
            labelText={t('actions:employees.filter')}
          >
            <IconButton
              aria-label="Filter"
              variant="iconButton"
              marginLeft="10px"
              icon={<MdOutlineFilterAlt />}
              onClick={onFilterBtnClick}
            />
          </BaseTooltip>
        ) : null}
      </Box>
    </Box>
  );
};
