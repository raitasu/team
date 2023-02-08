import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { MdAccountCircle, MdInput } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { PagePaths } from '~/router/router.constants';
import { Avatar } from '~/shared/ui/components/Avatar';
import { type Employee } from '~/store/api/employees/employees.types';

export const Profile = ({
  employee,
  onLogout
}: {
  employee: Employee;
  onLogout: () => void;
}) => {
  const [t] = useTranslation();

  return (
    <Menu
      placement="bottom-end"
      offset={[18, 25]}
    >
      <MenuButton>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          cursor="pointer"
        >
          <Text
            display={{ base: 'none', md: 'block' }}
            variant="r2"
            color="brand.headline"
            padding="12px 24px"
            fontWeight="500"
            maxWidth="188px"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {`${employee.first_name} ${employee.last_name}`}
          </Text>
          <Avatar
            size="md"
            variant={employee.status}
            src={employee.avatar_url ?? undefined}
          />
          <Box paddingLeft="6px">
            <IoIosArrowDown />
          </Box>
        </Box>
      </MenuButton>
      <MenuList>
        <Link to={`${PagePaths.Employees}/${employee.id}`}>
          <MenuItem icon={<MdAccountCircle size="20px" />}>
            {t('navigation:links.profile')}
          </MenuItem>
        </Link>
        <MenuDivider />
        <MenuItem
          icon={<MdInput size="20px" />}
          onClick={onLogout}
        >
          {t('domains:authorization.actions.sign_out')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
