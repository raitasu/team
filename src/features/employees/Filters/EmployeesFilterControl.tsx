import { useTranslation } from 'react-i18next';
import { MdOutlineFilterAlt } from 'react-icons/md';

import { usePageToolboxContext } from '~/shared/layout/Page/PageToolbox.context';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';

export const EmployeesFilterControl = () => {
  const [t] = useTranslation();
  const {
    disclosure: { onOpen },
    triggerRef
  } = usePageToolboxContext();

  return (
    <Tooltip
      hasArrow
      place="left"
      labelText={t('domains:filters.titles.filter', { count: 100 })}
    >
      <ControlButton
        ref={triggerRef}
        aria-label={t('domains:filters.titles.filter', { count: 100 })}
        onClick={onOpen}
        icon={<MdOutlineFilterAlt />}
      />
    </Tooltip>
  );
};
