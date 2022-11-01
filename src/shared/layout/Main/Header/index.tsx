import { Box } from '@chakra-ui/react';

import {
  HEADER_HEIGHT,
  SIDE_PAGE_PADDING
} from '~/shared/layout/layout.constants';
import { HeaderLogo } from '~/shared/layout/Main/Header/components/HeaderLogo';
import { LanguageSwitcher } from '~/shared/layout/Main/Header/components/LanguageSwitcher';
import { NavBar } from '~/shared/layout/Main/Header/components/NavBar';
import { ProfileContainer } from '~/shared/layout/Main/Header/components/Profile';

export const Header = () => (
  <Box
    position="fixed"
    top="0"
    maxHeight={HEADER_HEIGHT}
    height="100%"
    bg="brand.background2"
    width="100%"
    boxShadow="lg"
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    margin="auto"
    padding={`0 ${SIDE_PAGE_PADDING}`}
    zIndex="1"
  >
    <HeaderLogo />
    <Box
      display="flex"
      flex="1"
    />
    <NavBar />
    <Box
      display="flex"
      flex="2"
    />
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height="100%"
    >
      <LanguageSwitcher />
      <ProfileContainer />
    </Box>
  </Box>
);
