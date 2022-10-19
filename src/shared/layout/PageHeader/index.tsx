import { Box, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd, MdOutlineFilterAlt } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';
import { IconButton } from '~/shared/ui/components/IconButton';

import { BaseTooltip } from '../../ui/components/Tooltip';
import { PageHeaderProps } from './PageHeader.types';

export const PageHeader = ({
  title,
  onAddButtonClick,
  onFilterButtonClick,
  isAdmin
}: PageHeaderProps) => {
  const [t] = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="60px 110px 20px 110px"
    >
      <Heading variant="3">{title}</Heading>
      <Box>
        {isAdmin && (
          <Button
            variant="primaryOutline"
            leftIcon={<MdAdd />}
            onClick={onAddButtonClick}
          >
            {t('actions:employees.add_employee')}
          </Button>
        )}
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
            onClick={onFilterButtonClick}
          />
        </BaseTooltip>
      </Box>
    </Box>
  );
};
