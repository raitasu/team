import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineEdit, MdOutlineDelete } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const EducationInfoControllers = ({
  onOpenInfoTab,
  onOpenDeleteConfirm
}: {
  onOpenInfoTab: () => void;
  onOpenDeleteConfirm: () => void;
}) => {
  const [t] = useTranslation();

  return (
    <Flex gap="10px">
      <Tooltip
        hasArrow
        place="top"
        labelText={t('general_actions:edit')}
        minWidth="min-content"
      >
        <IconButton
          aria-label="Edit"
          variant="iconButtonSmall"
          icon={<MdOutlineEdit />}
          onClick={onOpenInfoTab}
          gridColumn="2 / 3"
          sx={{
            _hover: {
              color: 'brand.lightGray'
            }
          }}
        />
      </Tooltip>
      <Tooltip
        hasArrow
        place="top"
        labelText={t('general_actions:delete')}
        minWidth="min-content"
      >
        <IconButton
          aria-label="Delete"
          variant="iconButtonSmall"
          icon={<MdOutlineDelete />}
          onClick={onOpenDeleteConfirm}
          gridColumn="2 / 3"
          sx={{
            _hover: {
              color: 'brand.lightGray'
            }
          }}
        />
      </Tooltip>
    </Flex>
  );
};
