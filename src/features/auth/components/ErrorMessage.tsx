import { Box, Img } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import discordLogo from 'features/auth/assets/discordLogo.svg';

export const ErrorMessage = () => {
  const [t] = useTranslation();

  return (
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
        {t('errors:auth.no_access')}
      </Box>
    </>
  );
};
