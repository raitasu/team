import { Box, Img } from '@chakra-ui/react';

import logo from '~/shared/layout/Main/Header/assets/logo.svg';
import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

import { Avatar } from './Avatar';
import { Description } from './Description';
import { Name } from './Name';
import { Position } from './Position';

export const CVContainer = ({ cv }: { cv: GetCVResponse }) => (
  <Box
    height="min-content"
    padding="45px 60px"
    border="1px solid"
    borderColor="brand.stroke"
    borderRadius="4px"
    bg="brand.white"
    width="892px"
    margin="0 auto"
  >
    <Box
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Img
          src={logo}
          width="240px"
          mb={5}
          alt="company logo"
        />
        <Name cv={cv} />
        <Position cv={cv} />
      </Box>
      <Avatar cv={cv} />
    </Box>
    <Description cv={cv} />
  </Box>
);
