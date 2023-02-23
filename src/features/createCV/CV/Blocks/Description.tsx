import { Text } from '@chakra-ui/react';

import { type GetCVResponse } from '~/store/api/CV/cv.types';

export const Description = ({ cv }: { cv: GetCVResponse }) => (
  <Text
    mt={3}
    fontSize="lg"
    color="brand.black"
  >
    {cv.profile.description}
  </Text>
);
