import { Box, Img } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import logo from '~/shared/layout/Main/Header/assets/logo.svg';

export const HeaderLogo = () => (
  <Box flexShrink={0}>
    <NavLink to={PagePaths.Employees}>
      <Img
        height="40px"
        minHeight="40px"
        src={logo}
        width="auto"
        alt="Logo team"
      />
    </NavLink>
  </Box>
);
