import React from 'react';

import type { TextProps } from '@chakra-ui/react';
import {
  Heading,
  Text,
  Stack,
  Link as ChackraLink,
  Box,
  HStack
} from '@chakra-ui/react';

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
export const Paragraph = ({
  children,
  ...props
}: TextProps & { children: React.ReactNode }) => (
  <Text
    variant="r"
    style={{
      marginTop: '0',
      marginBottom: '20px'
    }}
    {...props}
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

export const DescriptionItem = ({
  channel,
  description
}: {
  channel: string;
  description: string;
}) => (
  <HStack
    gap="20px"
    marginBottom="20px"
  >
    <Box
      as="dt"
      width="107px"
      color="brand.headline2"
      lineHeight="120%"
      textAlign="end"
    >
      {channel}
    </Box>
    <Box
      as="dd"
      color="brand.ghostGray"
      lineHeight="120%"
      style={{ marginInlineStart: 0 }}
    >
      {description}
    </Box>
  </HStack>
);
