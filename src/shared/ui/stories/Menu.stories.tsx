import {
  Grid,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { Button } from '../components/Button';

export default {
  title: 'UI/Menu',
  component: Menu
};

export const Variants = () => {
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true
  });
  const {
    isOpen: isOpenTwo,
    onOpen: onOpenTwo,
    onClose: onCloseTwo
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isOpenThree,
    onOpen: onOpenThree,
    onClose: onCloseThree
  } = useDisclosure({ defaultIsOpen: true });
  const {
    isOpen: isOpenFour,
    onOpen: onOpenFour,
    onClose: onCloseFour
  } = useDisclosure({ defaultIsOpen: true });
  return (
    <Grid
      width="680px"
      columnGap="20px"
      rowGap="220px"
      templateColumns="repeat(2, 1fr)"
    >
      <Menu
        isOpen={isOpen}
        onOpen={onOpen}
        offset={[50, 10]}
      >
        <MenuButton
          as={Button}
          onClick={isOpen ? onClose : onOpen}
        >
          {`${isOpen ? 'Close' : 'Open'} menu default`}
        </MenuButton>
        <MenuList>
          <MenuItem>First item</MenuItem>
          <MenuDivider />
          <MenuItem>Second item</MenuItem>
          <MenuDivider />
          <MenuItem>Third item</MenuItem>
          <MenuDivider />
          <MenuItem>FInal item</MenuItem>
        </MenuList>
      </Menu>

      <Menu
        isOpen={isOpenTwo}
        onOpen={onOpenTwo}
        offset={[50, 10]}
      >
        <MenuButton
          as={Button}
          onClick={isOpenTwo ? onCloseTwo : onOpenTwo}
        >
          {`${isOpenTwo ? 'Close' : 'Open'} menu with divider`}
        </MenuButton>
        <MenuList>
          <MenuItem>First item</MenuItem>
          <MenuDivider />
          <MenuItem>Second item</MenuItem>
          <MenuDivider />
          <MenuItem>Third item</MenuItem>
          <MenuDivider />
          <MenuItem>FInal item</MenuItem>
        </MenuList>
      </Menu>

      <Menu
        isOpen={isOpenThree}
        offset={[50, 10]}
      >
        <MenuButton
          as={Button}
          onClick={isOpenThree ? onCloseThree : onOpenThree}
        >
          {`${isOpenThree ? 'Close' : 'Open'} menu with icons`}
        </MenuButton>
        <MenuList>
          <MenuItem icon={<MdAdd />}>First item</MenuItem>
          <MenuItem icon={<MdAdd />}>Second item</MenuItem>
          <MenuItem icon={<MdAdd />}>Third item</MenuItem>
          <MenuItem icon={<MdAdd />}>Final item</MenuItem>
        </MenuList>
      </Menu>

      <Menu
        isOpen={isOpenFour}
        offset={[50, 10]}
      >
        <MenuButton
          as={Button}
          onClick={isOpenFour ? onCloseFour : onOpenFour}
        >
          {`${isOpenFour ? 'Close' : 'Open'} menu with icons and dividers`}
        </MenuButton>
        <MenuList>
          <MenuItem icon={<MdAdd />}>First item</MenuItem>
          <MenuDivider />
          <MenuItem icon={<MdAdd />}>Second item</MenuItem>
          <MenuDivider />
          <MenuItem icon={<MdAdd />}>Third item</MenuItem>
          <MenuDivider />
          <MenuItem icon={<MdAdd />}>Final item</MenuItem>
        </MenuList>
      </Menu>
    </Grid>
  );
};
