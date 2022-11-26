import { Grid, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH
} from '~/features/employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';

export const PublicationsInfoItem = ({
  publication
}: {
  publication: EmployeePublication;
}) => {
  const [t, { language }] = useTranslation();

  return (
    <InfoSection
      title={getTranslation(publication.name_translations, language)}
    >
      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Text color="brand.lightGray">
          {getFormattedDate(publication.date, language, DateFormats.Long)}
        </Text>

        <Grid rowGap="10px">
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.publications.description'
              )} `}
            </Text>
            {getTranslation(publication.description_translations, language)}
          </Text>
          <Link
            href={publication.link}
            target="_blank"
          >
            <Text
              color="brand.headline2"
              textDecoration="underline"
            >
              {t('domains:employee.titles.profile_tabs.publications.link')}
            </Text>
          </Link>
          <Link
            href={publication.file}
            target="_blank"
          >
            <Text
              color="brand.headline2"
              textDecoration="underline"
            >
              {t('domains:employee.titles.profile_tabs.publications.file')}
            </Text>
          </Link>
        </Grid>
      </Grid>
    </InfoSection>
  );
};
