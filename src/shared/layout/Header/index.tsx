import { Box } from '@chakra-ui/react';

import { HeaderLogo } from '~/shared/layout/Header/components/HeaderLogo';
import { NavBar } from '~/shared/layout/Header/components/NavBar';

import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProfileContainer } from './components/Profile';

export const Header = () => (
  <Box
    height="80px"
    bg="brand.background2"
    width="100%"
  >
    <Box
      bg="brand.background2"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="1380px"
      margin="auto"
      padding="0 20px"
      height="100%"
      width="100%"
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
  </Box>
);
