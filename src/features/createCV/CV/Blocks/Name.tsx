import { Heading } from '@chakra-ui/react';

import { type GetCVResponse } from '~/store/api/CV/cv.types';

export const Name = ({ cv }: { cv: GetCVResponse }) => (
  <Heading
    size="2xl"
    sx={{ textTransform: 'capitalize' }}
  >
    {`${cv.profile.first_name} ${cv.profile.last_name.charAt(0)}.`}
  </Heading>
);
