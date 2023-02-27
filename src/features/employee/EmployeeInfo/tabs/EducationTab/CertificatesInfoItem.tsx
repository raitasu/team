import { Flex, Grid, Heading, Link, Text } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import { useTranslation } from 'react-i18next';
import { IoMdLink } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { Tooltip } from '~/shared/ui/components/Tooltip';
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
      <Flex alignItems="center">
        <Heading
          color="brand.ghostGray"
          fontWeight={700}
          variant="4"
          marginRight="14px"
        >
          {capitalize(certificate.name || '')}
        </Heading>
        {certificate.link && (
          <Tooltip
            hasArrow
            place="top"
            labelText={t('general_actions:follow_link')}
            minWidth="min-content"
          >
            <Link
              href={certificate.link}
              target="_blank"
            >
              <ControlButton
                icon={
                  <IoMdLink
                    color="var(--chakra-colors-brand-accentRed)"
                    style={{ width: '24px', height: '24px' }}
                  />
                }
                bgColor="inherit"
                aria-label="save-link"
                width="24px"
                height="24px"
              />
            </Link>
          </Tooltip>
        )}
        {typeof certificate.file === 'string' && (
          <Tooltip
            hasArrow
            place="top"
            labelText={t('general_actions:download')}
            minWidth="min-content"
          >
            <Link
              href={`${import.meta.env.VITE_API_HOST}${certificate.file}`}
              target="_blank"
            >
              <ControlButton
                icon={
                  <MdOutlineFileDownload
                    color="var(--chakra-colors-brand-accentRed)"
                    style={{ width: '24px', height: '24px' }}
                  />
                }
                bgColor="inherit"
                aria-label="save-file"
                width="24px"
                height="24px"
              />
            </Link>
          </Tooltip>
        )}
      </Flex>

      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid rowGap={ROW_GAP}>
          <Text color="brand.lightGray">
            {getFormattedDate(certificate.start_date || '', language)}
            {certificate.end_date &&
              ` - ${getFormattedDate(certificate.end_date, language)}`}
          </Text>
        </Grid>

        <Grid
          rowGap={ROW_GAP}
          justifyItems="start"
        />
      </Grid>
    </Flex>
  );
};
