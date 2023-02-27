import { Flex, type FlexProps, Grid, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

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
  onEdit,
  onDelete,
  ...throwProps
}: {
  title?: string;
  children: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
} & FlexProps) => {
  const { t } = useTranslation();

  return (
    <Flex
      {...throwProps}
      flexDirection="column"
      gap="20px"
      p={SECTION_PADDING}
      sx={{
        '&:not(:last-child)': {
          borderBottom: '1px solid var(--chakra-colors-brand-stroke)'
        }
      }}
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
        <Flex
          gap="10px"
          alignSelf="flex-end"
        >
          {onEdit ? (
            <Tooltip
              hasArrow
              place="top"
              labelText={t('general_actions:edit')}
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
          {onDelete ? (
            <Tooltip
              hasArrow
              place="top"
              labelText={t('general_actions:delete')}
            >
              <IconButton
                aria-label="delete-avatar"
                variant="iconButtonSmall"
                icon={<MdOutlineDelete />}
                onClick={onDelete}
              />
            </Tooltip>
          ) : null}
        </Flex>
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
