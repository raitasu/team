import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { MdOutlineDelete } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { type ProjectManagers } from '~/store/api/projects/projects.types';

import { stylesButton } from '../../tables.styles';

export const ActionsCell = ({
  getValue,
  table: {
    options: { meta = {} }
  }
}: CellContext<ProjectManagers, ProjectManagers>) => {
  const [t] = useTranslation();

  const { onDeleteManager } = meta;

  if (!onDeleteManager) {
    throw new Error(
      'Table should implement onDeleteManager and project profile!'
    );
  }

  const manager = getValue();

  return (
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
          onDeleteManager(manager.id);
        }}
        sx={stylesButton}
        variant="iconButtonSmall"
      />
    </Tooltip>
  );
};
