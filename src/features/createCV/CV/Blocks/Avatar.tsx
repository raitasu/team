import { Box } from '@chakra-ui/react';

import { Avatar as ChakraAvatar } from '~/shared/ui/components/Avatar';
import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

export const Avatar = ({ cv }: { cv: GetCVResponse }) => (
  <Box>
    <ChakraAvatar
      size="cv"
      src={
        cv.profile.avatar
          ? `${import.meta.env.VITE_API_HOST}${cv.profile.avatar}`
          : undefined
      }
    />
  </Box>
);
