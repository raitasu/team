import {
  Box,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import { FormControl } from '../components/FormControl';

export default {
  title: 'UI/FormControls Search',
  component: FormControl
};

export const Variants = () => (
  <>
    <Box>
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control with label
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl
          label="Label"
          helperText="This is a caption"
        >
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl label="Label">
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
        >
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>
      </Grid>
    </Box>

    <Box marginTop="30px">
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control without label
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl helperText="This is a caption">
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl>
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl errorMessage="This is an error caption!">
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>
      </Grid>
    </Box>

    <Box marginTop="30px">
      <Heading
        size="lg"
        marginBottom="20px"
      >
        Form control require
      </Heading>
      <Grid
        width="680px"
        gap="20px"
        templateColumns="repeat(2, 1fr)"
      >
        <FormControl
          label="Label"
          helperText="This is a caption"
          isRequired
        >
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl
          label="Label"
          isRequired
        >
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>

        <FormControl
          label="Label"
          errorMessage="This is an error caption!"
          isRequired
        >
          <InputGroup>
            <InputLeftElement color="brand.lightGray">
              <MdSearch size="20px" />
            </InputLeftElement>
            <Input placeholder="Enter text" />
          </InputGroup>
        </FormControl>
      </Grid>
    </Box>
  </>
);
