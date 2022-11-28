import { useController } from 'react-hook-form';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { EmployeeAvatarEditor } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EmployeeAvatarEditor';

export const EmployeeAvatar = () => {
  const { field } = useController<CreateEmployeeValues, 'avatar'>({
    name: 'avatar'
  });

  return (
    <EmployeeAvatarEditor
      avatar={field.value}
      onAvatarChanged={field.onChange}
    />
  );
};
