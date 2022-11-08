import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { Button } from '~/shared/ui/components/Button';

export const AddCVModal = ({
  employeeId,
  onClose
}: {
  employeeId: number | null;
  onClose: () => void;
}) => {
  const [t] = useTranslation();

  const navigate = useNavigate();

  return (
    <BaseModal
      isCentered
      onClose={onClose}
      contentProps={{
        maxWidth: '448px'
      }}
      isOpen={employeeId !== null}
      shouldUseOverlay
      title={t('actions:general.create_cv')}
      footer={
        employeeId !== null && (
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
              textDecoration="none"
              paddingLeft="30px"
              paddingRight="30px"
              onClick={() =>
                navigate(`${PagePaths.Employees}/${employeeId}/add-cv`)
              }
            >
              {t('actions:general.yes')}
            </Button>
          </Box>
        )
      }
    >
      <Text variant="r2">{t('titles:employees.create_cv_description')}</Text>
    </BaseModal>
  );
};
