import { Box, Img } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import logo from '~/features/authentication/assets/logoFull.svg';
import { getAuthApiUrl } from '~/shared/store/api/authentication/authentication.api';
import { Button } from '~/shared/ui/components/Button';

export const LoginCard = () => {
  const [t] = useTranslation();

  return (
    <>
      <Img
        src={logo}
        alt="Logo team"
      />
      <Box
        marginTop="50.5px"
        fontWeight="700"
        fontSize="4xl"
        lineHeight="120%"
      >
        {t('titles:auth.welcome')}
      </Box>
      <a href={getAuthApiUrl()}>
        <Button
          width="250px"
          marginTop="49px"
        >
          {t('actions:auth.sign_in')}
        </Button>
      </a>
    </>
  );
};
