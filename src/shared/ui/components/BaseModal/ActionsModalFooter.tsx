import React from 'react';

import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import type en from '~/services/i18n/locales/en.json';
import { Button } from '~/shared/ui/components/Button';

export const ActionsModalFooter = ({
  onCancel,
  onSubmit,
  onReset,
  isValid,
  isTouched,
  submitTag = 'save',
  isLoading
}: {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onReset: React.MouseEventHandler<HTMLButtonElement>;
  isValid?: boolean;
  isTouched?: boolean;
  isLoading?: boolean;
  submitTag?: keyof typeof en['general_actions'];
}) => {
  const [t] = useTranslation();

  return (
    <>
      <Button
        variant="primaryGhost"
        onClick={onReset}
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
          onClick={onSubmit}
          disabled={!isValid || !isTouched || isLoading}
          isLoading={isLoading}
        >
          {t(`general_actions:${submitTag}`)}
        </Button>
      </Box>
    </>
  );
};
