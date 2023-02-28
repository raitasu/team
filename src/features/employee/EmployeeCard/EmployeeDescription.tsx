import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import differenceInYears from 'date-fns/differenceInYears';
import { useTranslation } from 'react-i18next';
import { MdLocationOn } from 'react-icons/md';

import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type Employee } from '~/store/api/employees/employees.types';

export const EmployeeDescription = ({ employee }: { employee: Employee }) => {
  const [t, { language }] = useTranslation();
  const city = employee.contacts.address?.city
    ? employee.contacts.address.city
    : t('domains:employee.errors.no_data');
  const country =
    employee.contacts.address?.country_code ||
    t('domains:employee.errors.no_data');
  const position = employee.positions?.length
    ? employee.positions[0].name
    : t('domains:employee.errors.no_data');
  const projectCount = t('domains:employee.titles.project', {
    count: employee.projects ? employee.projects.length : 0
  });

  const earliestWorkExperience = employee.work_experiences
    ?.map((item) => item.started_at)
    .sort((a, b) => (a < b ? 1 : -1))
    .pop();

  const startCareerCount = earliestWorkExperience
    ? getFormattedDate(earliestWorkExperience, language, DateFormats.Full)
    : t('domains:employee.errors.no_data');

  const workExperienceCount = t('domains:employee.titles.experience', {
    count: earliestWorkExperience
      ? differenceInYears(new Date(), new Date(earliestWorkExperience))
      : 0
  });

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
      <Heading variant="4">{`${employee.first_name} ${employee.last_name}`}</Heading>
      <Text variant="hr">{position}</Text>
      <Flex justifyContent="center">
        <Text variant="dm">{workExperienceCount}</Text>
        <Text variant="dm">{projectCount}</Text>
      </Flex>
      <Flex justifyContent="center">
        <Box color="brand.body">
          <MdLocationOn size="18px" />
        </Box>
        <Text>{`${city} ${country}`}</Text>
      </Flex>
      <Text fontSize="14px">
        {t(
          'domains:employee.titles.profile_tabs.personal_information.general.start_career_in',
          { date: startCareerCount }
        )}
      </Text>
    </Box>
  );
};
