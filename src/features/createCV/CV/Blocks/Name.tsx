import { Heading } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { EditWrapper } from '../Edit/EditWrapper';

export const Name = ({
  setRegisteredField
}: {
  setRegisteredField: (fieldName: CVRegisterField | null) => void;
}) => {
  const { field } = useController<CVFormValues, 'profile'>({
    name: 'profile'
  });

  return (
    <EditWrapper onClick={() => setRegisteredField('profile.name')}>
      <Heading size="2xl">{field.value.name}</Heading>
    </EditWrapper>
  );
};
