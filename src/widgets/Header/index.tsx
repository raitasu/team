import { Box, Img, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import defaultAvatar from './assets/defaultAvatar.png';
import logo from './assets/logo.svg';

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
            <NavLink to="/">
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
              <NavLink to="/onboarding">
                {t('navigation:links.onboarding')}
              </NavLink>
            </ListItem>
            <ListItem marginRight="40px">
              <NavLink to="/">{t('navigation:links.employees')}</NavLink>
            </ListItem>
            <ListItem marginRight="40px">
              <NavLink to="/projects">{t('navigation:links.projects')}</NavLink>
            </ListItem>
          </UnorderedList>
          <Box
            className="filler"
            flexGrow="1"
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            cursor="pointer"
          >
            <Text
              padding="12px 24px"
              fontWeight="500"
            >
              Mayor Pain
            </Text>
            <Img
              src={defaultAvatar}
              borderRadius="50%"
              display="block"
              width="40px"
              height="40px"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
