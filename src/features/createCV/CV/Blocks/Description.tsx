import { Text } from '@chakra-ui/react';

import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

export const Description = ({ cv }: { cv: GetCVResponse }) => (
  <Text
    mt={3}
    fontSize="lg"
    color="brand.black"
  >
    {cv.profile.description}
  </Text>
);
