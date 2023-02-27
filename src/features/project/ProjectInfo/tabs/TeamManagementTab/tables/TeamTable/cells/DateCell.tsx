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
        ? work_experience.map((item) => {
            const { work_experience_positions } = item;

            if (
              work_experience_positions.length !== 0 &&
              work_experience_positions[0].start_date
            ) {
              return (
                <Box
                  display="flex"
                  gap="5px"
                  key={work_experience_positions[0].id}
                >
                  <Box>
                    {getFormattedDate(
                      work_experience_positions[0].start_date,
                      language
                    )}
                  </Box>
                  <Box>
                    {work_experience_positions[0]?.end_date
                      ? ` — ${getFormattedDate(
                          work_experience_positions[0].end_date,
                          language
                        )}`
                      : ` — ${t('enums:notes.nowadays')}`}
                  </Box>
                </Box>
              );
            }

            return <Box>{t('domains:employee.errors.no_data')}</Box>;
          })
        : null}
    </Box>
  );
};
