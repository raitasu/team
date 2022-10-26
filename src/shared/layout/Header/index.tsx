import { Box, Img, ListItem, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';

import logo from './assets/logo.svg';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ProfileContainer } from './components/Profile';

export const Header = () => {
  const [t] = useTranslation();
  return (
    <Box
      position="relative"
      top="0"
      left="0"
      right="0"
      height="80px"
      bg="brand.background2"
    >
      <Box
        maxWidth="1380px"
        margin="auto"
        height="100%"
        padding="0 20px"
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          fontSize="md"
          color="brand.headline"
        >
          <Box>
            <NavLink to={PagePaths.Main}>
              <Img
                height="40px"
                src={logo}
                alt="Logo team"
              />
            </NavLink>
          </Box>
          <UnorderedList
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            cursor="pointer"
            marginLeft="120px"
            listStyleType="none"
          >
            <ListItem marginRight="40px">
              <NavLink to={PagePaths.Onboarding}>
                {t('navigation:links.onboarding')}
              </NavLink>
            </ListItem>
            <ListItem marginRight="40px">
              <NavLink to={PagePaths.Main}>
                {t('navigation:links.employees')}
              </NavLink>
            </ListItem>
            <ListItem marginRight="40px">
              <NavLink to={PagePaths.Projects}>
                {t('navigation:links.projects')}
              </NavLink>
            </ListItem>
            <ListItem marginRight="40px">
              <NavLink to={PagePaths.Offboarding}>
                {t('navigation:links.offboarding')}
              </NavLink>
            </ListItem>
          </UnorderedList>
          <Box
            className="filler"
            flexGrow="1"
          />
          <LanguageSwitcher />
          <ProfileContainer />
        </Box>
      </Box>
    </Box>
  );
};
