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
  isLoading,
  variantButton = 'primaryGhost'
}: {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onReset?: React.MouseEventHandler<HTMLButtonElement>;
  isValid?: boolean;
  isTouched?: boolean;
  isLoading?: boolean;
  submitTag?: keyof (typeof en)['general_actions'];
  variantButton?: string;
}) => {
  const [t] = useTranslation();

  return (
    <>
      {onReset && (
        <Button
          variant="primaryGhost"
          onClick={onReset}
          isDisabled={!isTouched}
        >
          {t('general_actions:reset_all')}
        </Button>
      )}
      <Box>
        <Button
          variant={variantButton}
          onClick={onCancel}
          paddingLeft="32.5px"
          paddingRight="32.5px"
        >
          {t('general_actions:cancel')}
        </Button>
        <Button
          onClick={onSubmit}
          isDisabled={!isValid || !isTouched || isLoading}
          isLoading={isLoading}
        >
          {t(`general_actions:${submitTag}`)}
        </Button>
      </Box>
    </>
  );
};
