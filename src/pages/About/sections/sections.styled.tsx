import React from 'react';

import type {
  LinkProps,
  ListItemProps,
  StackProps,
  TextProps
} from '@chakra-ui/react';
import {
  Box,
  Heading,
  HStack,
  Link as ChackraLink,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react';

import { activeLinkStyles } from '~/pages/About/about.constants';

export const Subsection = ({
  border = '1px solid',
  children,
  ...props
}: StackProps & {
  border?: string;
  children: React.ReactNode;
}) => (
  <Stack
    as="section"
    padding="40px 40px 20px"
    borderBottom={border}
    borderColor="brand.stroke"
    {...props}
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
    color="brand.ghostGray"
    style={{
      marginTop: '0',
      marginBottom: '20px'
    }}
    {...props}
  >
    {children}
  </Text>
);

export const AboutLink = ({
  target,
  children,
  ...props
}: LinkProps & {
  target: string;
  children: React.ReactNode;
}) => (
  <ChackraLink
    {...props}
    href={target}
    target="_blank"
    width="min-content"
    color="brand.ghostGray"
    borderBottom="1px solid"
    borderColor="currentColor"
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
      minWidth="107px"
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

export const AboutListItem = ({
  children,
  ...props
}: ListItemProps & {
  children: React.ReactNode;
}) => (
  <ListItem
    marginLeft="30px"
    color="brand.ghostGray"
    {...props}
  >
    {children}
  </ListItem>
);
