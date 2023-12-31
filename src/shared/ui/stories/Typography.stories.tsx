import { Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default {
  title: 'UI/Typography',
  component: Heading,
  Text
};

export const Variants = () => (
  <Stack spacing={6}>
    <Heading variant="1">H1 Roboto Bold, 65px, 120% - variant 1</Heading>
    <Heading variant="2">H2 Roboto Bold, 45px, 120% - variant 2</Heading>
    <Heading variant="3">H3 Roboto Bold, 35px, 120% - variant 3</Heading>
    <Heading variant="4">H4 Roboto Bold, 24px, 120% - variant 4</Heading>
    <Heading variant="5">H5 Roboto Bold, 20px, 120% - variant 5</Heading>
    <Text variant="hb">Huge Bold roboto bold, 20px, 120% - variant hb</Text>
    <Text variant="bb">Huge Bold roboto bold, 20px, 120% - variant bb</Text>
    <Text variant="hr">
      Huge regular roboto Regular, 20px, 120% - variant hr
    </Text>
    <Text variant="m">Body medium Roboto Medium, 18px, 120%. - variant m</Text>
    <Text variant="l">Body large Roboto Regular, 18px, 120%. - variant l</Text>
    <Text variant="r">
      Regular 140% Roboto Regular, 16px, 140%. - variant r
    </Text>
    <Text variant="r2">
      Body regular Roboto Regular, 16px, 120%. - variant r2
    </Text>
    <Text variant="mh">
      Body regular Roboto Regular, 16px, 120%. - variant mh
    </Text>
    <Text variant="rs">
      Body regular Roboto Regular, 16px, 120%. - variant rs
    </Text>
    <Text variant="mm">
      Body regular Roboto Regular, 16px, 120%. - variant mm
    </Text>
    <Text variant="ma">
      Body regular Roboto Regular, 16px, 120%. - variant ma
    </Text>
    <Text variant="rr">
      Body regular Roboto Regular, 16px, 120%. - variant rr
    </Text>
    <Flex>
      <Text variant="dm">
        Body regular Roboto Regular with divider, 16px, 120%. - variant dm
      </Text>
      <Text variant="dm">
        Body regular Roboto Regular with divider, 16px, 120%. - variant dm
      </Text>
    </Flex>
  </Stack>
);
