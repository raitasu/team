import { Flex, Grid, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { Button } from '~/shared/ui/components/Button';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

export const CertificatesInfoItem = ({
  certificate
}: {
  certificate: EmployeeCertificate;
}) => {
  const [t, { language }] = useTranslation();

  const onDownloadDocument = () => {
    console.debug(`Download ${certificate.file}`);
  };

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
            {getTranslation(certificate.speciality_translations, language)}
          </Text>
          <Button
            variant="asLink"
            fontWeight="400"
            onClick={onDownloadDocument}
          >
            {t('domains:employee.titles.profile_tabs.education.document')}
          </Button>
        </Grid>
      </Grid>
    </Flex>
  );
};
