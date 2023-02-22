import { useController } from 'react-hook-form';

import { ProjectAvatarEditor } from '~/features/project/CreateProjectModal/ProjectAvatar/ProjectAvatarEditor';
import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';

export const AvatarField = ({
  onReset
}: {
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const {
    field,
    formState: { errors }
  } = useController<ProjectMainInfoFormValues, 'avatar'>({
    name: 'avatar'
  });

  const { field: status } = useController<ProjectMainInfoFormValues, 'status'>({
    name: 'status'
  });

  return (
    <FormControl
      width="none"
      errorMessage={errors.avatar?.message ? errors.avatar.message : undefined}
    >
      <ProjectAvatarEditor
        avatar={field.value}
        status={status.value}
        onAvatarChanged={(value: File | string | null) => {
          field.onChange(value);
          field.onBlur();
        }}
        onReset={onReset}
        avatarUrl={field.value as string}
      />
    </FormControl>
  );
};
