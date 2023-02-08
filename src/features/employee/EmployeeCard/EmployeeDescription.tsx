import { Box, Flex, Heading, Text } from '@chakra-ui/react';
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
  const workExperienceCount = t('domains:employee.titles.experience', {
    count: employee.years_of_experience ? employee.years_of_experience : 0
  });
  const startCareerCount = employee.start_career_at
    ? getFormattedDate(employee.start_career_at, language, DateFormats.Full)
    : t('domains:employee.errors.no_data');

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
