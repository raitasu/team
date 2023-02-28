import { Textarea, Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { Button } from '~/shared/ui/components/Button';

export const EditModal = ({
  registeredField,
  setRegisteredField
}: {
  registeredField: CVRegisterField | null;
  setRegisteredField: (fieldName: CVRegisterField | null) => void;
}) => {
  const { register } = useFormContext<CVFormValues>();
  const [t] = useTranslation();

  return (
    <BaseModal
      autoFocus
      isOpen={registeredField !== null}
      onClose={() => setRegisteredField(null)}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px'
      }}
    >
      {registeredField !== null && (
        <Textarea
          mt={3}
          fontSize="lg"
          color="brand.black"
          {...register(registeredField)}
        />
      )}
      <Flex justifyContent="space-between">
        <Button
          m={4}
          variant="primaryGhost"
          onClick={() => setRegisteredField(null)}
          paddingLeft="32.5px"
          paddingRight="32.5px"
        >
          {t('general_actions:cancel')}
        </Button>
        <Button
          m={4}
          alignSelf="flex-end"
          onClick={() => setRegisteredField(null)}
          paddingLeft="32.5px"
          paddingRight="32.5px"
        >
          {t('general_actions:save')}
        </Button>
      </Flex>
    </BaseModal>
  );
};
