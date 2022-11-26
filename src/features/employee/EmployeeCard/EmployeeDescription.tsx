import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdLocationOn } from 'react-icons/md';

import { getTranslation } from '~/services/i18n/i18n.utils';
import { type Employee } from '~/store/api/employees/employees.types';

export const EmployeeDescription = ({ employee }: { employee: Employee }) => {
  const [t, { language }] = useTranslation();

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
      <Text variant="hr">
        {getTranslation(employee.positions[0].name_translations, language)}
      </Text>
      <Flex justifyContent="center">
        <Text variant="dm">
          {t('domains:employee.titles.experience', {
            count: employee.years_of_experience
          })}
        </Text>
        <Text variant="dm">
          {t('domains:employee.titles.project', {
            count: employee.projects.length
          })}
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Box color="brand.body">
          <MdLocationOn size="18px" />
        </Box>
        <Text>{`${getTranslation(employee.contacts.address.city, language)} ${
          employee.contacts.address.country_code
        }`}</Text>
      </Flex>
    </Box>
  );
};
