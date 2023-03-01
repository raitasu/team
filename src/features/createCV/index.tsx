import { useState } from 'react';

import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CVContainer } from '~/features/createCV/CV';
import { CvBlocks } from '~/features/createCV/cv.constants';
import { type CVFormValues, CVSchema } from '~/features/createCV/cv.schema';
import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import {
  COLUMN_GAP,
  PROFILE_COLUMN_WIDTH
} from '~/pages/Employee/employee.styles';
import { PagePaths } from '~/router/router.constants';
import { toastConfig } from '~/shared/shared.constants';
import { ConfirmationModal } from '~/shared/ui/components/ConfirmationModal';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import {
  useSaveCVMutation,
  useDeleteCVMutation
} from '~/store/api/CV/cv.api.slice';
import { type GetCVResponse } from '~/store/api/CV/cv.types';
import { selectCVBlocks } from '~/store/slices/cv/cv.selectors';
import { useAppSelector } from '~/store/store.hooks';

export const CVForm = ({ cv }: { cv: GetCVResponse }) => {
  const [t] = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<CVFormValues>({
    defaultValues: cv,
    resolver: zodResolver(CVSchema)
  });
  const [saveCV] = useSaveCVMutation();
  const [deleteCV, { isLoading: isDeleteCVUpdating }] = useDeleteCVMutation();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const visibleBlocks = useAppSelector(selectCVBlocks);

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const onSave = async () => {
    try {
      await methods.handleSubmit(
        async (formData) => {
          const payload = formData.profile;

          Object.values(CvBlocks).forEach((key) => {
            if (!visibleBlocks.find((el) => el === key)) {
              payload[key] = null;
            }
          });

          await saveCV({
            employeeId: cv.profile.id,
            cvId: cv.id,
            cv: { payload }
          }).unwrap();
        },
        (err) => console.error('sv save error', err)
      )();
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

  const onDelete = async () => {
    try {
      await deleteCV({
        employeeId: cv.profile.id,
        cvId: cv.id
      }).unwrap();
      successToast({
        description: t('domains:cv.actions.cv_deleted')
      });
      navigate(`${PagePaths.Employees}/${cv.profile.id}`);
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <Flex
        overflow="hidden"
        flexGrow={1}
        gap={COLUMN_GAP}
      >
        <Flex
          width={PROFILE_COLUMN_WIDTH}
          maxH="100%"
          gap={COLUMN_GAP}
          flexDirection="column"
          overflow="hidden"
        >
          <CVSideNav
            cv={cv}
            onSave={onSave}
            onSaveAs={onSave}
            onDelete={() => {
              setDeleteModalOpen(true);
            }}
          />
        </Flex>
        <Flex
          flex="1"
          overflow="auto"
        >
          <CVContainer cv={cv} />
        </Flex>
      </Flex>
      <ConfirmationModal
        title={t('domains:global.confirmations.titles.delete_cv')}
        description={t('domains:global.confirmations.descriptions.delete_cv')}
        onConfirm={onDelete}
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        isLoading={isDeleteCVUpdating}
      />
    </FormProvider>
  );
};
