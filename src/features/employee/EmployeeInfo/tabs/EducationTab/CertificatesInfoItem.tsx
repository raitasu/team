import { Flex, Grid, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
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
    >
      <Text
        color="brand.ghostGray"
        textTransform="uppercase"
        fontWeight={500}
        variant="l"
      >
        {certificate.name}
      </Text>

      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid rowGap={ROW_GAP}>
          <Text color="brand.lightGray">{`${getFormattedDate(
            certificate.start_date,
            language
          )} - ${getFormattedDate(certificate.end_date, language)}`}</Text>
        </Grid>

        <Grid
          rowGap={ROW_GAP}
          justifyItems="start"
        >
          <Text>
            <Text
              as="span"
              fontWeight="500"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.education.title_certificates'
              )}: `}
            </Text>
            {certificate.name}
          </Text>
          <Link
            fontWeight="400"
            href={certificate.file}
            target="_blank"
            color="brand.headline2"
            textDecoration="underline"
            lineHeight="19px"
          >
            {t('domains:employee.titles.profile_tabs.education.link')}
          </Link>
          <Link
            fontWeight="400"
            href={certificate.file}
            target="_blank"
            color="brand.headline2"
            textDecoration="underline"
            lineHeight="19px"
          >
            {t('domains:employee.titles.profile_tabs.education.document')}
          </Link>
        </Grid>
      </Grid>
    </Flex>
  );
};
