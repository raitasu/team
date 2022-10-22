import { Box, Img, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import { PagePaths } from 'pages/pages.constants';
import { Avatar } from 'shared/ui/components/Avatar';

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
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            cursor="pointer"
          >
            <Text
              variant="r2"
              color="brand.headline"
              padding="12px 24px"
              fontWeight="500"
            >
              Mayor Pain
            </Text>
            <Avatar
              size="md"
              variant="active"
            />
            <Box paddingLeft="6px">
              <IoIosArrowDown />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
