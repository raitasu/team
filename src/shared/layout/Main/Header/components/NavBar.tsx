import { Box, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';

const headerLinks = [
  {
    target: PagePaths.About,
    translationTag: 'navigation:links.about'
  },
  {
    target: PagePaths.Employees,
    translationTag: 'navigation:links.employees'
  },
  {
    target: PagePaths.Projects,
    translationTag: 'navigation:links.project'
  }
] as const;

const activeLinkStyles = {
  textDecoration: 'underline',
  textDecorationColor: 'brand.accentRed'
};

export const NavBar = () => {
  const [t] = useTranslation();

  return (
    <Box
      display="flex"
      height="100%"
    >
      {headerLinks.map(({ translationTag, target }) => (
        <Link
          key={target}
          as={NavLink}
          to={target}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="0 20px"
          _hover={activeLinkStyles}
          _activeLink={activeLinkStyles}
        >
          {t(translationTag, { count: 100 })}
        </Link>
      ))}
    </Box>
  );
};
