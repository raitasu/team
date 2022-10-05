import { Box } from '@chakra-ui/react';

import { Avatar } from '../components/Avatar';

export default {
  title: 'UI/Avatar',
  component: Avatar
};

export const Variants = () => (
  <Box
    display="flex"
    flexDirection="column"
  >
    <Box>
      <Avatar
        size="sm"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        size="sm"
        name="Kola Tioluwani"
      />
    </Box>
    <Box
      marginTop="20px"
      marginBottom="20px"
    >
      <Avatar
        width="40px"
        height="40px"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        width="40px"
        height="40px"
        name="Kola Tioluwani"
      />
    </Box>
    <Box>
      <Avatar
        width="250px"
        height="250px"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        width="250px"
        height="250px"
        name="Kola Tioluwani"
      />
    </Box>
  </Box>
);
