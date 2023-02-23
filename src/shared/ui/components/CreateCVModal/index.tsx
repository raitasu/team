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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { DateFormats, toastConfig } from '~/shared/shared.constants';
import { Button } from '~/shared/ui/components/Button';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { useCreateCVMutation } from '~/store/api/CV/cv.api.slice';

export const CreateCVModal = ({
  isOpen,
  onClose,
  employeeId
}: {
  isOpen: boolean;
  onClose: () => void;
  employeeId: number | null;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [t, { language }] = useTranslation();
  const navigate = useNavigate();
  const [createCV, { isLoading: isUpdating }] = useCreateCVMutation();
  const [name, setName] = React.useState('');

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const onConfirmHandler = async () => {
    if (employeeId === null) {
      return;
    }

    const nameResult =
      name === ''
        ? `${getFormattedDate(Date.now(), language, DateFormats.DateAndTime)}`
        : name;

    try {
      const data = await createCV({
        employeeId,
        name: nameResult
      }).unwrap();

      navigate(`${PagePaths.Employees}/${employeeId}/cv/${data}`);
      successToast({
        description: t('domains:cv.actions.cv_saved')
      });
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
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
              isDisabled={isUpdating}
            >
              {t('general_actions:cancel')}
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirmHandler}
              paddingLeft="30px"
              paddingRight="30px"
              isDisabled={isUpdating}
              isLoading={isUpdating}
            >
              {t('general_actions:create')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
