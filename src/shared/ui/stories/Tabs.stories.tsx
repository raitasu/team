import { TabList, Tabs, Tab, Box } from '@chakra-ui/react';

export default {
  title: 'UI/Tabs',
  component: Tabs
};

export const Variants = () => (
  <Box
    width="855px"
    boxShadow="0 0 0 1px var(--chakra-colors-brand-stroke)"
    borderRadius="4px 4px 0px 0px"
  >
    <Tabs>
      <TabList>
        <Tab>Personal information</Tab>
        <Tab>Work experience</Tab>
        <Tab>Skills & Languages</Tab>
        <Tab>Education & Certificates</Tab>
        <Tab>Publications</Tab>
      </TabList>
    </Tabs>
  </Box>
);
