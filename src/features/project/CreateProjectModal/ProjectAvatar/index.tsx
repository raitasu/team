import { useController } from 'react-hook-form';

import { FormControl } from '~/shared/ui/components/FormControl';

import { ProjectAvatarEditor } from './ProjectAvatarEditor';
import { type CreateProjectFormValues } from '../project.schema';

export const ProjectAvatar = ({
  onReset
}: {
  onReset: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const {
    field,
    formState: { errors }
  } = useController<CreateProjectFormValues, 'avatar'>({
    name: 'avatar'
  });

  const { field: status } = useController<CreateProjectFormValues, 'status'>({
    name: 'status'
  });

  return (
    <FormControl
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
      />
    </FormControl>
  );
};
