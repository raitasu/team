import { Flex } from '@chakra-ui/react';
import {
  type FieldArrayWithId,
  type UseFieldArrayRemove
} from 'react-hook-form';
import { MdDeleteOutline } from 'react-icons/all';

import { type EditTeamEmployeeFormValues } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/EditTeamEmployee.schema';
import { DateField } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/Fields/DateField';
import { PositionField } from '~/features/project/ProjectInfo/tabs/TeamManagementTab/modals/EditTeamEmployee/Fields/PositionField';
import { IconButton } from '~/shared/ui/components/IconButton';

export const PositionSection = ({
  index,
  fields,
  remove
}: {
  index: number;
  fields: Array<FieldArrayWithId<EditTeamEmployeeFormValues>>;
  remove: UseFieldArrayRemove;
}) => (
  <Flex justifyContent="space-between">
    <Flex
      flexDirection="column"
      gap="20px"
    >
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
