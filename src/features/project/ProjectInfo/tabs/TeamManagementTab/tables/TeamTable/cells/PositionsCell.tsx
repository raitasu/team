import { Box } from '@chakra-ui/layout';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { type ProjectTeam } from '~/store/api/projects/projects.types';

export const PositionsCell = ({
  getValue
}: CellContext<ProjectTeam, ProjectTeam>) => {
  const [t] = useTranslation();
  const { work_experience } = getValue();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="14px"
    >
      {work_experience.map((item) => {
        if (item.positions.length !== 0) {
          return item.positions.map((item) => (
            <Box
              color="brand.ghostGray"
              key={item.id}
            >
              {item.name}
            </Box>
          ));
        }

        return <Box>{t('domains:employee.errors.no_data')}</Box>;
      })}
    </Box>
  );
};
