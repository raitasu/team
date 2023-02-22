import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const ProjectDescription = ({
  project
}: {
  project: ProjectResponse;
}) => {
  const [t, { language }] = useTranslation();

  const startProjectCount = project.started_at
    ? getFormattedDate(project.started_at, language, DateFormats.Short)
    : t('domains:employee.errors.no_data');

  const endProjectCount = project.ended_at
    ? getFormattedDate(project.ended_at, language, DateFormats.Short)
    : t(`domains:projects.status.in_progress`);

  const projectType = (
    <Flex justifyContent="center">
      <Text>{t(`domains:projects.type.${project.project_type}`)}</Text>
      <Text pl="3px">{t('domains:projects.project')}</Text>
    </Flex>
  );

  return (
    <Box
      sx={{
        '> *:not(:last-child)': {
          marginBottom: '10px'
        },
        '> *': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }
      }}
      textAlign="center"
    >
      <Heading variant="4">
        {project.name || t('domains:employee.errors.no_data')}
      </Heading>
      <Text variant="hr">
        {project.customer
          ? project.customer.name
          : t('domains:employee.errors.no_data')}
      </Text>
      <Flex justifyContent="center">
        <Text>{`${startProjectCount} –`}</Text>
        <Text pl="3px">{endProjectCount}</Text>
      </Flex>
      {projectType}
    </Box>
  );
};
