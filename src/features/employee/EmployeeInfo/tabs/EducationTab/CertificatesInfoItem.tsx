import { Flex, Grid, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP,
  SECTION_PADDING
} from '~/features/employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

export const CertificatesInfoItem = ({
  certificate
}: {
  certificate: EmployeeCertificate;
}) => {
  const [t, { language }] = useTranslation();

  return (
    <Flex
      flexDirection="column"
      gap="20px"
      padding={SECTION_PADDING}
      borderBottom="1px solid var(--chakra-colors-brand-stroke)"
      _notLast={{
        borderBottom: '1px dashed var(--chakra-colors-brand-stroke)'
      }}
    >
      <Text
        color="brand.ghostGray"
        textTransform="uppercase"
        fontWeight={500}
        variant="l"
      >
        {getTranslation(certificate.institute_translations, language)}
      </Text>

      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid rowGap={ROW_GAP}>
          <Text color="brand.lightGray">{`${getFormattedDate(
            certificate.start_at,
            language
          )} - ${getFormattedDate(certificate.end_at, language)}`}</Text>
          <Text>
            {`${getTranslation(certificate.city)}, ${certificate.country_code}`}
          </Text>
        </Grid>

        <Grid rowGap={ROW_GAP}>
          <Text>
            <Text
              as="span"
              fontWeight="500"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.education.document'
              )}: `}
            </Text>
            {certificate.file}
          </Text>
          <Text>
            <Text
              as="span"
              fontWeight="500"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.education.fields_of_study'
              )}: `}
            </Text>
            {getTranslation(certificate.speciality_translations, language)}
          </Text>
        </Grid>
      </Grid>
    </Flex>
  );
};
