import { Flex, Img, Text, useMediaQuery } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { SMALL_SCREEN_WIDTH } from '~/shared/layout/layout.constants';
import logo from '~/shared/layout/Main/Header/assets/logo.svg';
import smallLogo from '~/shared/layout/Main/Header/assets/small-logo.svg';

export const HeaderLogo = () => {
  const [isLagerThan] = useMediaQuery(`(min-width: ${SMALL_SCREEN_WIDTH})`);

  return (
    <Flex
      flexShrink={0}
      flexDirection="column"
    >
      <NavLink to={PagePaths.Employees}>
        <Img
          flex={1}
          maxHeight="40px"
          minHeight="20px"
          src={isLagerThan ? logo : smallLogo}
          width="auto"
          alt="Logo team"
        />
      </NavLink>
      <Text as="span">{import.meta.env.VITE_APP_VERSION.slice(0, 8)}</Text>
    </Flex>
  );
};
