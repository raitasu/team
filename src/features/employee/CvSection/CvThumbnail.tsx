import { Flex, Grid, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  MdOutlineEdit,
  MdOutlineDownload,
  MdOutlineDelete
} from 'react-icons/md';

import { getTranslation } from '~/services/i18n/i18n.utils';
import type { EmployeeCv } from '~/shared/store/api/employees/employees.types';
import { IconButton } from '~/shared/ui/components/IconButton';

export const CvThumbnail = ({
  cv,
  onDelete,
  onDownload,
  onEdit
}: {
  cv: EmployeeCv;
  onDelete?: () => void;
  onDownload?: () => void;
  onEdit?: () => void;
}) => {
  const [t, { language }] = useTranslation();

  return (
    <Grid
      bg="brand.background2"
      alignItems="center"
      padding="20px 40px"
      border="1px solid"
      borderColor="brand.stroke"
      borderRadius="4px"
      templateColumns="1fr 96px"
      columnGap="10px"
      rowGap="8px"
    >
      <Text
        variant="bb"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        UserName
      </Text>
      <Text
        gridColumn="1 / -1"
        variant="r2"
        color="brand.headline"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {getTranslation(cv.position.name_translations, language)}
      </Text>
      <Flex
        gridColumn="2 / -1"
        gridRow="1 / 2"
        justifyContent="space-between"
      >
        <IconButton
          aria-label={t('actions:employee.download_cv')}
          variant="iconButtonSmallPrimary"
          icon={<MdOutlineDownload />}
          onClick={onDownload}
        />
        <IconButton
          aria-label={t('actions:employee.edit_cv')}
          variant="iconButtonSmallPrimary"
          icon={<MdOutlineEdit />}
          onClick={onEdit}
        />
        <IconButton
          aria-label={t('actions:employee.delete_cv')}
          variant="iconButtonSmallPrimary"
          icon={<MdOutlineDelete />}
          onClick={onDelete}
        />
      </Flex>
    </Grid>
  );
};
