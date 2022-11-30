import { Box, Img, useMediaQuery } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { SMALL_SCREEN_WIDTH } from '~/shared/layout/layout.constants';
import logo from '~/shared/layout/Main/Header/assets/logo.svg';
import smallLogo from '~/shared/layout/Main/Header/assets/small-logo.svg';

export const HeaderLogo = () => {
  const [isLagerThan] = useMediaQuery(`(min-width: ${SMALL_SCREEN_WIDTH})`);

  return (
    <Box flexShrink={0}>
      <NavLink to={PagePaths.Employees}>
        <Img
          height="40px"
          minHeight="40px"
          src={isLagerThan ? logo : smallLogo}
          width="auto"
          alt="Logo team"
        />
      </NavLink>
    </Box>
  );
};
