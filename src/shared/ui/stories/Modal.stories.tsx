import React from 'react';

import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Img,
  Input,
  useDisclosure
} from '@chakra-ui/react';

import { BaseModal } from 'shared/ui/components/Modal';
import defaultAvatar from 'widgets/Header/assets/defaultAvatar.png';

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
    // eslint-disable-next-line no-alert
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
        width="688px"
        isOpen={isOpen}
        modalHeader={false}
        modalOverlay
        modalFooter={false}
        body={
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
        }
      />
      <BaseModal
        onClose={onCloseTwo}
        width="688px"
        isOpen={isOpenTwo}
        modalHeader
        modalOverlay
        modalFooter={false}
        title="GENERAL INFORMATION"
        body={
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
        }
      />
      <BaseModal
        onClose={onCloseThree}
        width="688px"
        isOpen={isOpenThree}
        modalHeader={false}
        modalOverlay
        modalFooter
        body={
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
        }
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              Delete
            </Button>
            <Box>
              <Button onClick={testFunction}>Save</Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseThree}
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      />
      <BaseModal
        onClose={onCloseFour}
        width="688px"
        isOpen={isOpenFour}
        modalHeader
        modalOverlay
        modalFooter
        title="GENERAL INFORMATION"
        body={
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
        }
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              Delete
            </Button>
            <Box>
              <Button onClick={testFunction}>Save</Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseFour}
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      />
      <BaseModal
        onClose={onCloseFive}
        width="1000px"
        isOpen={isOpenFive}
        modalHeader
        modalOverlay
        modalFooter
        title="GENERAL INFORMATION"
        body={
          <Box display="flex">
            <Img
              marginRight="24px"
              src={defaultAvatar}
              borderRadius="350px"
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
        }
        footer={
          <>
            <Button
              variant="primaryGhost"
              onClick={testFunction}
            >
              Delete
            </Button>
            <Box>
              <Button onClick={testFunction}>Save</Button>
              <Button
                variant="secondaryGhost"
                onClick={onCloseFive}
              >
                Cancel
              </Button>
            </Box>
          </>
        }
      />
    </Box>
  );
};
