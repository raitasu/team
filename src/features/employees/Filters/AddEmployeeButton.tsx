import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const AddEmployeeButton = () => {
  const [t] = useTranslation();

  return (
    <Tooltip
      hasArrow
      place="left"
      labelText={t('actions:employees.add_employee')}
    >
      <ControlButton
        aria-label={t('actions:employees.add_employee')}
        icon={<MdAdd />}
      />
    </Tooltip>
  );
};
