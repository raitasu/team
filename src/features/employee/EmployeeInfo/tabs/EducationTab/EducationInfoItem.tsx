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
import { type EmployeeEducation } from '~/store/api/employees/employees.types';

export const EducationInfoItem = ({
  education
}: {
  education: EmployeeEducation;
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
        {getTranslation(education.university_name_translations, language)}
      </Text>

      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid rowGap={ROW_GAP}>
          <Text color="brand.lightGray">{`${getFormattedDate(
            education.start_at,
            language
          )} - ${getFormattedDate(education.end_at, language)}`}</Text>
          <Text>
            {`${getTranslation(education.city)}, ${education.country_code}`}
          </Text>
        </Grid>

        <Grid rowGap={ROW_GAP}>
          <Text>
            <Text
              as="span"
              fontWeight="500"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.education.degree'
              )}: `}
            </Text>
            {getTranslation(education.degree, language)}
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
            {getTranslation(education.speciality_translations, language)}
          </Text>
        </Grid>
      </Grid>
    </Flex>
  );
};
