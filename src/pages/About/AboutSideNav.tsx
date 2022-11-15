import { Box, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import {
  aboutLinks,
  activeNavLinkStyles,
  hoverNavLinkStyles
} from '~/pages/About/about.constants';

export const AboutSideNav = () => {
  const [t] = useTranslation();

  return (
    <Box
      flex="0 0 330px"
      height="min-content"
      padding="20px 15px"
      border="1px solid"
      borderColor="brand.stroke"
      borderRadius="4px"
      bg="brand.white"
    >
      {aboutLinks.map(({ translationTag, target }) => (
        <Link
          key={target}
          as={NavLink}
          to={target}
          display="block"
          color="brand.ghostGray"
          fontSize="16px"
          lineHeight="120%"
          padding="8px 15px"
          _hover={hoverNavLinkStyles}
          _activeLink={activeNavLinkStyles}
        >
          {t(translationTag)}
        </Link>
      ))}
    </Box>
  );
};
