import { Flex, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineEdit } from 'react-icons/md';

import {
  COLUMN_GAP,
  ROW_GAP,
  SECTION_PADDING
} from '~/features/employee/employee.styles';
import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const InfoSection = ({
  title,
  children,
  onEdit
}: {
  title?: string;
  children: React.ReactNode;
  onEdit?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      p={SECTION_PADDING}
      borderBottom="1px solid var(--chakra-colors-brand-stroke)"
      position="relative"
    >
      <Grid
        gridTemplateColumns="1fr auto"
        gap={COLUMN_GAP}
      >
        {title ? (
          <Heading
            variant="4"
            textTransform="uppercase"
          >
            {title}
          </Heading>
        ) : null}
        {onEdit ? (
          <Tooltip
            hasArrow
            place="top"
            labelText={t('domains:employee.actions.edit_block')}
          >
            <IconButton
              aria-label="DownloadCV"
              variant="iconButtonSmall"
              icon={<MdOutlineEdit />}
              onClick={onEdit}
              gridColumn="2 / 3"
            />
          </Tooltip>
        ) : null}
      </Grid>

      <Flex
        flexDirection="column"
        gap={ROW_GAP}
      >
        {children}
      </Flex>
    </Flex>
  );
};
