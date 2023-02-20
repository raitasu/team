import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Heading,
  Input
} from '@chakra-ui/react';
import {
  skipToken,
  type FetchBaseQueryError
} from '@reduxjs/toolkit/dist/query/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useCreateCVMutation } from '~/store/api/createCV/createCV.api';

export const CreateCVModal = ({
  isOpen,
  onClose,
  isLoading,
  employeeId
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoading?: boolean;
  employeeId: number | null;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [t] = useTranslation();
  const navigate = useNavigate();
  const [createCV] = useCreateCVMutation();
  const [name, setName] = React.useState('');

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);
  const onConfirmHandler = async () => {
    const response = await createCV({
      employeeId: employeeId || Number(skipToken),
      name
    }).unwrap();

    if ((response as { error?: FetchBaseQueryError }).error) {
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    } else {
      if (employeeId) {
        navigate(`${PagePaths.Employees}/${employeeId}/cv/${response}`);
      }

      successToast({
        description: t('domains:cv.actions.cv_saved')
      });
    }
  };

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
            <Heading variant="5">
              {t('domains:employee.actions.create_cv_confirmation')}
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Input
              placeholder={t('domains:employee.actions.cv_name')}
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
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
              {t('general_actions:cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirmHandler}
              paddingLeft="30px"
              paddingRight="30px"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {t('general_actions:create')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
