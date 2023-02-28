import { Flex } from '@chakra-ui/react';
import {
  type FieldArrayWithId,
  type UseFieldArrayRemove
} from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/all';

import { type ProjectTeamFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/AddNewEmployeeToTeam.schema';
import { DateField } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/Fields/DateField';
import { NameField } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/Fields/NameField';
import { PositionField } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/AddNewEmployeeToTeam/Fields/PositionField';
import { IconButton } from '~/shared/ui/components/IconButton';

export const EmployeeSection = ({
  index,
  remove,
  fields
}: {
  index: number;
  remove: UseFieldArrayRemove;
  fields: Array<FieldArrayWithId<ProjectTeamFormValues>>;
}) => (
  <Flex justifyContent="space-between">
    <Flex
      flexDirection="column"
      gap="20px"
    >
      <NameField index={index} />
      <PositionField index={index} />
      <DateField index={index} />
    </Flex>
    <IconButton
      isDisabled={fields.length === 1}
      aria-label="delete_employee"
      variant="iconButtonSmall"
      icon={<MdDeleteOutline color="var(--chakra-colors-brand-accentRed)" />}
      onClick={() => remove(index)}
    />
  </Flex>
);
