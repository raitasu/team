import { Box } from '@chakra-ui/react';

import { Avatar } from 'shared/ui/components/Avatar';

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
        variant="active"
        size="sm"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="active"
        size="sm"
        name="Kola Tioluwani"
      />
      <Avatar
        variant="candidate"
        size="sm"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="candidate"
        size="sm"
        name="Kola Tioluwani"
      />
      <Avatar
        variant="inactive"
        size="sm"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="inactive"
        size="sm"
        name="Kola Tioluwani"
      />
    </Box>
    <Box
      marginTop="20px"
      marginBottom="20px"
    >
      <Avatar
        size="md"
        variant="active"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        size="md"
        variant="active"
        name="Kola Tioluwani"
      />
    </Box>
    <Box>
      <Avatar
        variant="active"
        size="lg"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="active"
        size="lg"
        name="Kola Tioluwani"
      />
      <Avatar
        variant="candidate"
        size="lg"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="candidate"
        size="lg"
        name="Kola Tioluwani"
      />
      <Avatar
        variant="inactive"
        size="lg"
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
      />
      <Avatar
        variant="inactive"
        size="lg"
        name="Kola Tioluwani"
      />
    </Box>
  </Box>
);
