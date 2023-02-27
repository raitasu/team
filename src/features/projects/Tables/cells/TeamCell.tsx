import { AvatarGroup, Text } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Avatar } from '~/shared/ui/components/Avatar';
import defaultAvatar from '~/shared/ui/components/Avatar/defaultAvatar.svg';
import { type ShortProject } from '~/store/api/projects/projects.types';

export const TeamCell = ({
  getValue
}: CellContext<ShortProject, ShortProject['team']>) => {
  const [t] = useTranslation();
  const team = getValue();

  return team.length ? (
    <AvatarGroup
      size="md"
      max={3}
    >
      {team.map((employee) => (
        <Avatar
          key={employee.id}
          size="md"
          title={`${employee.first_name} ${employee.last_name}`}
          src={
            employee.avatar
              ? `${import.meta.env.VITE_API_HOST}${employee.avatar}`
              : defaultAvatar
          }
        />
      ))}
    </AvatarGroup>
  ) : (
    <Text color="brand.lightGray">{t('domains:projects.errors.no_team')}</Text>
  );
};
