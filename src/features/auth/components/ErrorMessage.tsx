import { Box, Img } from '@chakra-ui/react';

import discordLogo from '~/features/auth/assets/discordLogo.svg';

export const ErrorMessage = ({ message }: { message: string }) => (
  <>
    <Img
      src={discordLogo}
      alt="Discord logo"
    />
    <Box
      marginTop="20px"
      textAlign="center"
      minWidth="307px"
      color="brand.accentRed"
      fontSize="sm"
    >
      {message}
    </Box>
  </>
);
