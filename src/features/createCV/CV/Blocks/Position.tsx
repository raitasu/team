import { Heading, Box, Flex, Text } from '@chakra-ui/react';
import { getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

export const Position = ({ cv }: { cv: GetCVResponse }) => {
  const [t] = useTranslation();

  const projectCount = t('domains:employee.titles.project', {
    count: cv.profile.work_experiences ? cv.profile.work_experiences.length : 0
  });

  const workExperienceCount = t('domains:employee.titles.experience', {
    count:
      getYear(new Date(Date.now())) -
      getYear(new Date(cv.profile.start_career_at))
  });

  return (
    <Box
      mb={5}
      mt={5}
    >
      <Heading
        size="xl"
        mb={2}
      >
        {cv.profile.position}
      </Heading>
      <Flex>
        <Text
          variant="dm"
          fontSize="xl"
        >
          {workExperienceCount}
        </Text>
        <Text
          variant="dm"
          fontSize="xl"
        >
          {projectCount}
        </Text>
      </Flex>
    </Box>
  );
};
