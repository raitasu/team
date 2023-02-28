import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { CVContainer } from '~/features/createCV/CV';
import { type CVFormValues, CVSchema } from '~/features/createCV/cv.schema';
import { CVSideNav } from '~/features/createCV/sideNav/CVSideNav';
import {
  COLUMN_GAP,
  PROFILE_COLUMN_WIDTH
} from '~/pages/Employee/employee.styles';
import { type GetCVResponse } from '~/store/api/CV/cv.types';

export const CVForm = ({ cv }: { cv: GetCVResponse }) => {
  const methods = useForm<CVFormValues>({
    defaultValues: cv,
    resolver: zodResolver(CVSchema)
  });

  const onDelete = () => {
    methods.reset();
  };

  const onSave = () => {
    methods.handleSubmit(() => true);
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
            onDelete={onDelete}
          />
        </Flex>
        <Flex
          flex="1"
          overflow="auto"
        >
          <CVContainer cv={cv} />
        </Flex>
      </Flex>
    </FormProvider>
  );
};
