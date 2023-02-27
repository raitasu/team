import { Box } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type ProjectTeam } from '~/store/api/projects/projects.types';

import { stylesButton } from '../../tables.styles';

export const ActionsCell = ({
  getValue,
  table: {
    options: { meta = {} }
  }
}: CellContext<ProjectTeam, ProjectTeam>) => {
  const [t] = useTranslation();
  const { onEditMemberTeam, onDeleteMemberTeam } = meta;

  if (!onEditMemberTeam || !onDeleteMemberTeam) {
    throw new Error(
      'Table should implement onEditMemberTeam or onDeleteMemberTeam and project profile!'
    );
  }

  const employee = getValue();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="8px"
    >
      <Tooltip
        minWidth="min-content"
        hasArrow
        place="top"
        labelText={t('general_actions:edit')}
      >
        <IconButton
          icon={<MdOutlineEdit />}
          aria-label={t('general_actions:edit')}
          onClick={() => {
            onEditMemberTeam(employee.id);
          }}
          sx={{
            ...stylesButton,
            boxSize: '20px',
            minWidth: '20px'
          }}
          variant="iconButtonSmall"
        />
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
            onDeleteMemberTeam(
              employee.work_experience.map(
                (item) => item.work_experience_positions[0].work_experience_id
              )
            );
          }}
          sx={stylesButton}
          variant="iconButtonSmall"
        />
      </Tooltip>
    </Box>
  );
};
