import React from 'react';

import { Heading, Text, Stack, Link as ChackraLink } from '@chakra-ui/react';

import { activeLinkStyles } from '~/pages/Onboarding/onboarding.constants';

export const Subsection = ({
  border = '1px solid',
  children
}: {
  border?: string;
  children: React.ReactNode;
}) => (
  <Stack
    as="section"
    padding="40px 40px 20px"
    borderBottom={border}
    borderColor="brand.stroke"
  >
    {children}
  </Stack>
);

export const Subtitle = ({ children }: { children: React.ReactNode }) => (
  <Heading
    variant="5"
    marginBottom="20px"
    textTransform="uppercase"
  >
    {children}
  </Heading>
);
export const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <Text
    variant="r"
    style={{
      marginTop: '0',
      marginBottom: '20px'
    }}
  >
    {children}
  </Text>
);

export const OnboardingLink = ({
  target,
  children
}: {
  target: string;
  children: React.ReactNode;
}) => (
  <ChackraLink
    href={target}
    display="block"
    marginBottom="10px"
    color="brand.ghostGray"
    textDecoration="underline"
    textDecorationColor="brand.ghostGray"
    _hover={activeLinkStyles}
    _activeLink={activeLinkStyles}
  >
    {children}
  </ChackraLink>
);
