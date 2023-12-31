import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const AddEmployeeButton = ({ onClick }: { onClick: () => void }) => {
  const [t] = useTranslation();

  return (
    <Tooltip
      hasArrow
      place="left"
      labelText={t('domains:employee.actions.create_profile')}
    >
      <ControlButton
        aria-label={t('domains:employee.actions.create_profile')}
        icon={<MdAdd />}
        onClick={onClick}
      />
    </Tooltip>
  );
};
