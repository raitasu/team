import { useMemo } from 'react';

import { Grid, Link, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH
} from '~/features/employee/employee.styles';
import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate, workPeriod } from '~/shared/utils/dates.utils';
import { type EmployeeWorkExperience } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';

export const WorkExperienceInfo = ({
  workExperience
}: {
  workExperience: EmployeeWorkExperience;
}) => {
  const [t, { language }] = useTranslation();

  const { months, years } = useMemo(
    () => workPeriod(workExperience.started_at, workExperience.ended_at),
    [workExperience.ended_at, workExperience.started_at]
  );

  return (
    <InfoSection
      title={workExperience.positions
        .map((position) => position.name)
        .join(',')}
    >
      <Grid
        gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
        columnGap={COLUMN_GAP}
      >
        <Grid
          gap="10px"
          alignSelf="start"
        >
          <Text>
            <Link
              as={NavLink}
              to="/projects"
            >{`${workExperience.project_name} `}</Link>
            ({workExperience.company_name})
          </Text>
          <Text color="brand.lightGray">
            {`${getFormattedDate(
              workExperience.started_at,
              language,
              DateFormats.Short
            )} - ${
              workExperience.ended_at
                ? getFormattedDate(
                    workExperience.ended_at,
                    language,
                    DateFormats.Short
                  )
                : `${t(`domains:employee.titles.present`)} `
            }`}
          </Text>
          <Text color="brand.lightGray">
            {`(${
              years
                ? t('domains:employee.titles.experience', {
                    count: years
                  })
                : ''
            } ${t('domains:employee.titles.experience_month', {
              count: months
            })})`}
          </Text>
        </Grid>
        <Grid rowGap="10px">
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.description'
              )}: `}
            </Text>
            {workExperience.description}
          </Text>
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.responsibilities'
              )}: `}
            </Text>
            {workExperience.responsibilities}
          </Text>
          <Text>
            <Text
              as="span"
              fontWeight="500"
              color="brand.headline2"
            >
              {`${t(
                'domains:employee.titles.profile_tabs.work_experience.environment'
              )}: `}
            </Text>
            {workExperience.environments.map((item) => `${item}; `)}
          </Text>
        </Grid>
      </Grid>
    </InfoSection>
  );
};
