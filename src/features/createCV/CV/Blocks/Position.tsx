import { Heading, Box, Flex, Text, Divider } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { EditWrapper } from '../Edit/EditWrapper';

export const Position = ({
  setRegisteredField
}: {
  setRegisteredField: (fieldName: CVRegisterField | null) => void;
}) => {
  const { field } = useController<CVFormValues, 'profile'>({
    name: 'profile'
  });

  return (
    <Box
      mb={5}
      mt={5}
    >
      <EditWrapper
        isInline
        onClick={() => setRegisteredField('profile.position')}
      >
        <Heading
          size="xl"
          mb={2}
        >
          {field.value.position === '' || field.value.position === null
            ? '...'
            : field.value.position}
        </Heading>
      </EditWrapper>
      <Flex>
        <EditWrapper
          isInline
          onClick={() => setRegisteredField('profile.years_of_experience')}
        >
          <Text
            variant="dm"
            fontSize="xl"
          >
            {field.value.years_of_experience}
          </Text>
        </EditWrapper>
        <Divider
          ml={2}
          mr={2}
          sx={{ borderWidth: '1px', borderColor: '#7B7D7D', height: '20px' }}
          orientation="vertical"
        />
        <EditWrapper
          isInline
          onClick={() => setRegisteredField('profile.projects_count')}
        >
          <Text
            variant="dm"
            fontSize="xl"
          >
            {field.value.projects_count}
          </Text>
        </EditWrapper>
      </Flex>
    </Box>
  );
};
