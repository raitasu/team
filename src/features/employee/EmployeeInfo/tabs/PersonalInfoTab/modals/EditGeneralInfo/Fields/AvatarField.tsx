import React from 'react';

import { useController } from 'react-hook-form';

import { EmployeeAvatarEditor } from '~/features/employee/CreateEmployeeModal/EmployeeAvatar/EmployeeAvatarEditor';
import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const AvatarField = ({
  onReset,
  avatarUrl
}: {
  onReset: React.MouseEventHandler<HTMLButtonElement>;
  avatarUrl: string | null;
}) => {
  const {
    field,
    formState: { errors }
  } = useController<EmployeeGeneralInfoFormValues, 'avatar'>({
    name: 'avatar'
  });
  const { field: status } = useController<
    EmployeeGeneralInfoFormValues,
    'status'
  >({
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
        avatarUrl={avatarUrl}
        avatarFile={field.value}
        onAvatarChanged={onAvatarChanged}
        status={status.value}
        onReset={onReset}
      />
    </FormControl>
  );
};
