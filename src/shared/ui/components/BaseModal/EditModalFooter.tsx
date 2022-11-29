import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/shared/ui/components/Button';

export const EditModalFooter = ({
  onCancel,
  onSave,
  onReset,
  isValid,
  isTouched
}: {
  onCancel: () => void;
  onSave: () => void;
  onReset: () => void;
  isValid: boolean;
  isTouched: boolean;
}) => {
  const [t] = useTranslation();

  return (
    <>
      <Button
        variant="primaryGhost"
        onClick={() => onReset()}
        disabled={!isTouched}
      >
        {t('general_actions:reset_all')}
      </Button>
      <Box>
        <Button
          variant="primaryGhost"
          onClick={onCancel}
          paddingLeft="32.5px"
          paddingRight="32.5px"
        >
          {t('general_actions:cancel')}
        </Button>
        <Button
          onClick={() => onSave()}
          disabled={!isValid || !isTouched}
        >
          {t('general_actions:save')}
        </Button>
      </Box>
    </>
  );
};
