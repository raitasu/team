import React from 'react';

import { Box, Button, Img } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

import discordLogo from '../assets/discordLogo.svg';

import { AuthorizationType } from '../index';

export const ErrorState = (props: AuthorizationType) => {
  const { error, setError } = props;
  return (
    <>
      <Img
        marginTop="58px"
        src={discordLogo}
        alt="Discord logo"
      />
      <NavLink to="/">
        <Button
          width="250px"
          marginTop="20.14px"
          onClick={() => {
            setError(!error);
          }}
        >
          Log in
        </Button>
      </NavLink>
      <Box
        marginTop="20px"
        textAlign="center"
        width="307px"
        color="brand.accentRed"
        fontSize="14px"
        lineHeight="120%"
      >
        Oops. You have no access to that Discord server. Please, contact the
        admin.
      </Box>
    </>
  );
};
