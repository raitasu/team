import { Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

import { CVHeading } from './CVHeading';

export const WorkExperience = ({ cv }: { cv: GetCVResponse }) => {
  const [t, { language }] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.work_experience`)} />
      {cv.profile.work_experiences?.map((workExperience) => (
        <Box key={workExperience.company_name}>
          <Text
            mt={7}
            mb={2}
            fontSize="lg"
            color="brand.black"
          >
            {getFormattedDate(workExperience.started_at, language)}
            {workExperience.ended_at
              ? ` - ${getFormattedDate(workExperience.ended_at, language)}`
              : ''}
          </Text>
          <Text
            fontWeight="900"
            fontSize="xl"
            color="brand.black"
          >
            {workExperience.position}
          </Text>
          <Text
            fontSize="xl"
            mb={2}
            color="brand.lightGray"
          >
            {workExperience.company_name}
          </Text>
          <Box>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.description')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {workExperience.description}
            </Text>
          </Box>
          <Box mt={1}>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.responsibilities')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {workExperience.responsibilities}
            </Text>
          </Box>
          <Box mt={1}>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.environment')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {workExperience.environment
                .map((env: { name: string }) => env.name)
                .join('; ')}
              {workExperience.environment.length > 0 && '.'}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};
