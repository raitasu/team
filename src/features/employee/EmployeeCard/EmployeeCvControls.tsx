import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdLink } from 'react-icons/md';

import { Button } from '~/shared/ui/components/Button';

export const EmployeeCvControls = ({
  onCreate,
  onCopy,
  onDelete
}: {
  onCreate?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <Grid rowGap="10px">
      <Button
        variant="primary"
        onClick={onCreate}
      >
        {t('domains:employee.actions.create_cv')}
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdLink />}
        onClick={onCopy}
      >
        {t('domains:employee.actions.copy_profile')}
      </Button>
      <Button
        variant="primaryOutline"
        leftIcon={<MdDelete />}
        onClick={onDelete}
      >
        {t('domains:employee.actions.delete_profile')}
      </Button>
    </Grid>
  );
};
