import {
  Grid,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

export default {
  title: 'UI/Menu',
  component: Menu
};

const items = ['First item', 'Second item', 'Third item', 'Final'];

export const Variants = () => (
  <Grid
    width="680px"
    gap="20px"
    templateColumns="repeat(2, 1fr)"
  >
    <Menu>
      <MenuButton>Open menu default</MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton>Open menu with divider</MenuButton>
      <MenuList>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return <MenuItem key={item}>{item}</MenuItem>;
          }

          return (
            <>
              <MenuItem key={item}>{item}</MenuItem>
              <MenuDivider />
            </>
          );
        })}
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton>Open menu with icons</MenuButton>
      <MenuList>
        {items.map((item) => (
          <MenuItem
            key={item}
            icon={<MdAdd />}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>

    <Menu>
      <MenuButton>Open menu with icons and dividers</MenuButton>
      <MenuList>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <MenuItem
                key={item}
                icon={<MdAdd />}
              >
                {item}
              </MenuItem>
            );
          }

          return (
            <>
              <MenuItem
                key={item}
                icon={<MdAdd />}
              >
                {item}
              </MenuItem>
              <MenuDivider />
            </>
          );
        })}
      </MenuList>
    </Menu>
  </Grid>
);
