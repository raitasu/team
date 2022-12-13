import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdLocationOn } from 'react-icons/md';

import { getTranslation } from '~/services/i18n/i18n.utils';
import { type Employee } from '~/store/api/employees/employees.types';

export const EmployeeDescription = ({ employee }: { employee: Employee }) => {
  const [t, { language }] = useTranslation();
  const city = employee.contacts.address?.city
    ? getTranslation(employee.contacts.address.city, language)
    : t('domains:employee.errors.no_data');
  const country =
    employee.contacts.address?.country_code ||
    t('domains:employee.errors.no_data');
  const position = employee.positions?.length
    ? getTranslation(employee.positions[0].name_translations, language)
    : t('domains:employee.errors.no_data');
  const projectCount = t('domains:employee.titles.project', {
    count: employee.projects ? employee.projects.length : 0
  });
  const workExperienceCount = t('domains:employee.titles.experience', {
    count: employee.years_of_experience ? employee.years_of_experience : 0
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
      <Heading variant="4">{`${getTranslation(
        employee.first_name_translations,
        language
      )} ${getTranslation(
        employee.last_name_translations,
        language
      )}`}</Heading>
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
    </Box>
  );
};
