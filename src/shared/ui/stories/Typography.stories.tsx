import { Heading, Stack, Text } from '@chakra-ui/react';

export default {
  title: 'UI/Typography',
  component: Heading,
  Text
};

export const Variants = () => (
  <Stack spacing={6}>
    <Heading variant="1">H1 Roboto Bold, 65px, 120%</Heading>
    <Heading variant="2">H2 Roboto Bold, 45px, 120%</Heading>
    <Heading variant="3">H3 Roboto Bold, 35px, 120%</Heading>
    <Heading variant="4">H4 Roboto Bold, 24px, 120%</Heading>
    <Heading variant="5">H5 Roboto Bold, 20px, 120% </Heading>
    <Text variant="m">Body medium Roboto Medium, 18px, 120%. </Text>
    <Text variant="l">Body large Roboto Regular, 18px, 120%. </Text>
    <Text variant="r">Regular 140% Roboto Regular, 16px, 140%. </Text>
    <Text variant="r2">Body regular Roboto Regular, 16px, 120%. </Text>
    <Text variant="mh">Body regular Roboto Regular, 16px, 120%. </Text>
    <Text variant="rs">Body regular Roboto Regular, 16px, 120%. </Text>
    <Text variant="mm">Body regular Roboto Regular, 16px, 120%. </Text>
    <Text variant="ma">Body regular Roboto Regular, 16px, 120%. </Text>
    <Text variant="rr">Body regular Roboto Regular, 16px, 120%. </Text>
  </Stack>
);
