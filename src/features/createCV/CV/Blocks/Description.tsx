import { Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { EditWrapper } from '../Edit/EditWrapper';

export const Description = ({
  setRegisteredField
}: {
  setRegisteredField: (fieldName: CVRegisterField | null) => void;
}) => {
  const { field } = useController<CVFormValues, 'profile'>({
    name: 'profile'
  });

  return (
    <EditWrapper onClick={() => setRegisteredField('profile.description')}>
      <Text
        mt={3}
        fontSize="lg"
        color="brand.black"
      >
        {field.value.description === null || field.value.description === ''
          ? '...'
          : field.value.description}
      </Text>
    </EditWrapper>
  );
};
