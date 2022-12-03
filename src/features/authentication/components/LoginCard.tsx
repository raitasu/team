import { Box, Img } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import logo from '~/features/authentication/assets/logoFull.svg';
import { TestIds } from '~/shared/layout/testids';
import { Button } from '~/shared/ui/components/Button';
import { getAuthApiUrl } from '~/store/api/authentication/authentication.api';

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
        {t('domains:authorization.titles.welcome')}
      </Box>
      <Button
        onClick={() => {
          window.location.assign(getAuthApiUrl());
        }}
        width="250px"
        marginTop="49px"
        data-test-id={TestIds.SignInBtn}
      >
        {t('domains:authorization.actions.sign_in')}
      </Button>
    </>
  );
};
