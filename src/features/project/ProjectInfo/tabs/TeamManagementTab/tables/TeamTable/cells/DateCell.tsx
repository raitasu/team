import { Box } from '@chakra-ui/layout';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type ProjectTeam } from '~/store/api/projects/projects.types';

export const DateCell = ({
  getValue
}: CellContext<ProjectTeam, ProjectTeam>) => {
  const [t, { language }] = useTranslation();
  const { work_experience } = getValue();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="14px"
    >
      {work_experience.length !== 0
        ? work_experience.map(({ work_experience_positions: positions }) => {
            if (positions.length !== 0) {
              return positions.map((item) => (
                <Box
                  display="flex"
                  gap="5px"
                  key={item.id}
                >
                  <Box>
                    {getFormattedDate(item.start_date as string, language)}
                  </Box>
                  <Box>
                    {item.end_date
                      ? ` — ${getFormattedDate(item.end_date, language)}`
                      : ` — ${t('enums:notes.nowadays')}`}
                  </Box>
                </Box>
              ));
            }

            return <Box>{t('domains:employee.errors.no_data')}</Box>;
          })
        : null}
    </Box>
  );
};
