import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  useDisclosure
} from '@chakra-ui/react';

import { BaseModal } from 'shared/ui/components/Modal';

import { Avatar } from '../components/Avatar';

export default {
  title: 'UI/Modals',
  component: BaseModal
};

export const Variants = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTwo,
    onOpen: onOpenTwo,
    onClose: onCloseTwo
  } = useDisclosure();
  const {
    isOpen: isOpenThree,
    onOpen: onOpenThree,
    onClose: onCloseThree
  } = useDisclosure();
  const {
    isOpen: isOpenFour,
    onOpen: onOpenFour,
    onClose: onCloseFour
  } = useDisclosure();
  const {
    isOpen: isOpenFive,
    onOpen: onOpenFive,
    onClose: onCloseFive
  } = useDisclosure();
  const testFunction = () => {
    // eslint-disable-next-line no-alert --- mockup function
    alert('done');
  };
  return (
    <Box>
      <ButtonGroup spacing={6}>
        <Button onClick={onOpen}>simple modal</Button>
        <Button onClick={onOpenTwo}>modal with header</Button>
        <Button onClick={onOpenThree}>modal with footer </Button>
        <Button onClick={onOpenFour}>full modal</Button>
        <Button onClick={onOpenFive}>full modal with avatar</Button>
      </ButtonGroup>

      <BaseModal
        onClose={onClose}
        contentProps={{
          maxWidth: '688px'
        }}
        isOpen={isOpen}
        shouldUseOverlay
      >
        <Box display="flex">
          <Box width="100%">
            <FormControl>
              <FormLabel color="brand.body">First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="brand.body">Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </Box>
        </Box>
      </BaseModal>
      <BaseModal
        onClose={onCloseTwo}
        contentProps={{
          maxWidth: '688px'
        }}
        isOpen={isOpenTwo}
        shouldUseOverlay
        title="GENERAL INFORMATION"
      >
        <Box width="100%">
          <FormControl>
            <FormLabel color="brand.body">First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="brand.body">Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </Box>
      </BaseModal>
      <BaseModal
        onClose={onCloseThree}
        contentProps={{
          maxWidth: '688px'
        }}
        isOpen={isOpenThree}
        shouldUseOverlay
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              reset all
            </Button>
            <Box>
              <Button
                onClick={testFunction}
                paddingLeft="32.5px"
                paddingRight="32.5px"
              >
                Save
              </Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseThree}
                paddingLeft="20px"
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      >
        <Box width="100%">
          <FormControl>
            <FormLabel color="brand.body">First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="brand.body">Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </Box>
      </BaseModal>
      <BaseModal
        onClose={onCloseFour}
        contentProps={{
          maxWidth: '688px'
        }}
        isOpen={isOpenFour}
        shouldUseOverlay
        title="GENERAL INFORMATION"
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              reset all
            </Button>
            <Box>
              <Button
                onClick={testFunction}
                paddingLeft="32.5px"
                paddingRight="32.5px"
              >
                Save
              </Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseFour}
                paddingLeft="20px"
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      >
        <Box width="100%">
          <FormControl>
            <FormLabel color="brand.body">First name</FormLabel>
            <Input placeholder="First name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color="brand.body">Last name</FormLabel>
            <Input placeholder="Last name" />
          </FormControl>
        </Box>
      </BaseModal>
      <BaseModal
        onClose={onCloseFive}
        contentProps={{
          maxWidth: '1000px'
        }}
        isOpen={isOpenFive}
        shouldUseOverlay
        title="GENERAL INFORMATION"
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              reset all
            </Button>
            <Box>
              <Button
                onClick={testFunction}
                paddingLeft="32.5px"
                paddingRight="32.5px"
              >
                Save
              </Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseFive}
                paddingLeft="20px"
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      >
        <Box display="flex">
          <Avatar
            variant="active"
            marginRight="24px"
            size="lg"
          />
          <Box width="100%">
            <FormControl>
              <FormLabel color="brand.body">First name</FormLabel>
              <Input placeholder="First name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="brand.body">Last name</FormLabel>
              <Input placeholder="Last name" />
            </FormControl>
          </Box>
        </Box>
      </BaseModal>
    </Box>
  );
};
