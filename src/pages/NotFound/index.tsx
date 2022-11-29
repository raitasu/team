import { Box, Image, useMediaQuery, Text, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { PagePaths } from '~/router/router.constants';
import { PageContainer } from '~/shared/layout/Page/PageContainer';

import NotFoundImage from './assets/not-found-image.png';

export const NotFound = () => {
  const [isLargerThan1240] = useMediaQuery('(min-width: 1240px)');
  const [t] = useTranslation();

  return (
    <PageContainer
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        maxWidth="959px"
        maxHeight="626px"
        padding={`40px ${isLargerThan1240 ? '204.5px' : '100px'}`}
        backgroundColor="brand.white"
        border="1px solid"
        borderColor="brand.stroke"
        borderRadius="4px"
      >
        <Image
          width="100%"
          maxWidth="550px"
          height="auto"
          marginBottom="70px"
          borderRadius="4px"
          backgroundColor="inherit"
          src={NotFoundImage}
          alt="Screenshot"
        />
        <Text
          variant="bb"
          fontSize="calc(1rem + 1.2vw)"
          marginBottom="30px"
          textAlign="center"
        >
          {t('domains:global.errors.descriptions.not_found_page')}
        </Text>
        <Link
          display="block"
          width="250px"
          margin="0 auto"
          padding="8px 12px"
          borderRadius="4px"
          textTransform="uppercase"
          fontWeight="700"
          backgroundColor="brand.accentRed"
          textAlign="center"
          color="brand.white"
          _hover={{
            backgroundColor: 'brand.burntSienna'
          }}
          _active={{
            backgroundColor: 'brand.crusta',
            color: 'brand.headline'
          }}
          href={PagePaths.Employees}
        >
          {t('navigation:links.back_home')}
        </Link>
      </Box>
    </PageContainer>
  );
};
