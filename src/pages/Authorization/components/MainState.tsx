import React from 'react';

import { Box, Button, Img } from '@chakra-ui/react';

import { NavLink } from 'react-router-dom';

import logo from '../assets/logoFull.svg';

import { AuthorizationType } from '../index';

export const MainState = (props: AuthorizationType) => {
  const { error, setError } = props;
  return (
    <>
      <Img
        marginTop="43px"
        src={logo}
        alt="Logo team"
      />
      <Box
        marginTop="50.5px"
        fontWeight="700"
        fontSize="35px"
        lineHeight="120%"
      >
        Welcome aboard!
      </Box>
      <NavLink to="/">
        <Button
          width="250px"
          marginTop="49px"
          onClick={() => {
            setError(!error);
          }}
        >
          Log in
        </Button>
      </NavLink>
    </>
  );
};
