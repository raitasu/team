import { Flex, Grid, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
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
    >
      <Text
        color="brand.ghostGray"
        textTransform="uppercase"
        fontWeight={500}
        variant="l"
      >
        {education.university_name}
      </Text>

      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid rowGap={ROW_GAP}>
          <Text color="brand.lightGray">
            {getFormattedDate(education.started_at, language)}
            {education.graduated_at
              ? ` - ${getFormattedDate(education.graduated_at, language)}`
              : ''}
          </Text>
          <Text color="brand.lightGray">{education.country}</Text>
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
            {education.degree}
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
            {education.speciality}
          </Text>
        </Grid>
      </Grid>
    </Flex>
  );
};
