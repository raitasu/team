import { Box, Image, Text, Link } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { PagePaths } from '~/router/router.constants';
import { PageContainer } from '~/shared/layout/Page/PageContainer';

import NotFoundImage from './assets/not-found-image.png';

export const NotFound = () => {
  const [t] = useTranslation();

  return (
    <PageContainer
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="66%"
        minWidth="162px"
        padding="40px 12px"
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
          display="flex"
          justifyContent="center"
          width="26%"
          minWidth="max-content"
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
