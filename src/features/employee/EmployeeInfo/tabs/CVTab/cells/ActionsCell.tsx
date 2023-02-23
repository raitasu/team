import { Flex, Link } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import {
  MdOutlineDelete,
  MdOutlineDownload,
  MdOutlineEdit
} from 'react-icons/md';

import { PagePaths } from '~/router/router.constants';
import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type GetCVListResponse } from '~/store/api/CV/cv.types';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSize: '24px',
  color: 'brand.darkGray',
  _hover: { color: 'brand.lightGray' },
  _active: { color: 'brand.ghostGray' }
};

export const ActionsCell = ({
  getValue,
  table: {
    options: { meta = {} }
  }
}: CellContext<GetCVListResponse, GetCVListResponse>) => {
  const [t] = useTranslation();
  const { employee, onDeleteCV } = meta;

  if (!employee || !onDeleteCV) {
    throw new Error('Table should implement onDeleteCV and employee profile!');
  }

  const employeeId = employee.id;

  const cv = getValue();

  return (
    <Flex gap="10px">
      <Tooltip
        minWidth="min-content"
        hasArrow
        place="top"
        labelText={t('general_actions:download')}
      >
        <Link
          href={`${PagePaths.Employees}/${employeeId}/cv/${cv.link}`}
          target="_blank"
        >
          <IconButton
            icon={<MdOutlineDownload />}
            aria-label={t('general_actions:download')}
            sx={styles}
            variant="iconButtonSmall"
          />
        </Link>
      </Tooltip>
      <Tooltip
        minWidth="min-content"
        hasArrow
        place="top"
        labelText={t('general_actions:edit')}
      >
        <Link
          href={`${PagePaths.Employees}/${employeeId}/cv/${cv.id}`}
          target="_blank"
        >
          <IconButton
            icon={<MdOutlineEdit />}
            aria-label={t('general_actions:edit')}
            sx={styles}
            variant="iconButtonSmall"
          />
        </Link>
      </Tooltip>
      <Tooltip
        minWidth="min-content"
        hasArrow
        place="top"
        labelText={t('general_actions:delete')}
      >
        <IconButton
          icon={<MdOutlineDelete />}
          aria-label={t('general_actions:delete')}
          onClick={() => {
            onDeleteCV(cv.id);
          }}
          sx={styles}
          variant="iconButtonSmall"
        />
      </Tooltip>
    </Flex>
  );
};
