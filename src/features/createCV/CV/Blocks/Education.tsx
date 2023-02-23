import { Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type GetCVResponse } from '~/store/api/CV/cv.types';

import { CVHeading } from './CVHeading';

export const Education = ({ cv }: { cv: GetCVResponse }) => {
  const [t, { language }] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.education`)} />
      {cv.profile.educations?.map((education) => (
        <Box key={education.university_name}>
          <Text
            mt={7}
            mb={2}
            fontSize="lg"
            color="brand.black"
          >
            {getFormattedDate(education.started_at, language)}
            {education.graduated_at
              ? ` - ${getFormattedDate(education.graduated_at, language)}`
              : ''}
          </Text>
          <Text
            fontWeight="900"
            fontSize="xl"
            color="brand.black"
          >
            {education.university_name}
          </Text>
          <Text
            fontSize="lg"
            mb={2}
            color="brand.lightGray"
          >
            {education.country}
          </Text>
          <Box>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.degree')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {education.degree}
            </Text>
          </Box>
          <Box mt={1}>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.fields_of_study')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {education.speciality}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};
