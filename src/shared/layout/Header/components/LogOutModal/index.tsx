import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/shared/ui/components/Button';
import { BaseModal } from '~/shared/ui/components/Modal';

export const LogOutModal = ({
  isOpen,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [t] = useTranslation();
  return (
    <BaseModal
      onClose={onClose}
      contentProps={{
        maxWidth: '448px'
      }}
      isOpen={isOpen}
      shouldUseOverlay
      title={t('titles:auth.log_out_title')}
      footer={
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            variant="secondaryGhost"
            onClick={onClose}
            paddingLeft="30px"
            paddingRight="30px"
          >
            {t('actions:general.no')}
          </Button>
          <Button
            onClick={onConfirm}
            paddingLeft="30px"
            paddingRight="30px"
          >
            {t('actions:general.yes')}
          </Button>
        </Box>
      }
    >
      <Text variant="r2">{t('titles:auth.log_out_description')}</Text>
    </BaseModal>
  );
};
