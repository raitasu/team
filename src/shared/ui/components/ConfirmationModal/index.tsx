import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Heading,
  Text
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Button } from '~/shared/ui/components/Button';

export const ConfirmationModal = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  isLoading
}: {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [t] = useTranslation();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading variant="5">{title}</Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text variant="r2">{description}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant="secondaryGhost"
              ref={cancelRef}
              onClick={onClose}
              paddingLeft="30px"
              paddingRight="30px"
              isDisabled={isLoading}
            >
              {t('general_actions:no')}
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              paddingLeft="30px"
              paddingRight="30px"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {t('general_actions:yes')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
