import { Box } from '@chakra-ui/react';

import { HeaderLogo } from '~/shared/layout/Main/Header/components/HeaderLogo';
import { LanguageSwitcher } from '~/shared/layout/Main/Header/components/LanguageSwitcher';
import { NavBar } from '~/shared/layout/Main/Header/components/NavBar';
import { ProfileContainer } from '~/shared/layout/Main/Header/components/Profile';
import { HEADER_HEIGHT, MAX_CONTENT_WIDTH } from '~/shared/ui/ui.constants';

export const Header = () => (
  <Box
    height={HEADER_HEIGHT}
    bg="brand.background2"
    width="100%"
    boxShadow="lg"
  >
    <Box
      bg="brand.background2"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxWidth={MAX_CONTENT_WIDTH}
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
