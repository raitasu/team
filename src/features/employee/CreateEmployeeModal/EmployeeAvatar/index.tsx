import React from 'react';

import { useController } from 'react-hook-form';

import { type CreateEmployeeValues } from '~/features/employee/CreateEmployeeModal/employee.schema';
import { EmployeeAvatarEditor } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EmployeeAvatarEditor';
import { FormControl } from '~/shared/ui/components/FormControl';

export const EmployeeAvatar = ({
  onReset
}: {
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const {
    field,
    formState: { errors }
  } = useController<CreateEmployeeValues, 'avatar'>({
    name: 'avatar'
  });
  const { field: status } = useController<CreateEmployeeValues, 'status'>({
    name: 'status'
  });

  const onAvatarChanged = (value: string | null | File) => {
    field.onChange(value);
    field.onBlur();
  };

  return (
    <FormControl
      errorMessage={errors.avatar?.message ? errors.avatar.message : undefined}
    >
      <EmployeeAvatarEditor
        avatarUrl={null}
        avatarFile={field.value}
        onAvatarChanged={onAvatarChanged}
        status={status.value}
        onReset={onReset}
      />
    </FormControl>
  );
};
