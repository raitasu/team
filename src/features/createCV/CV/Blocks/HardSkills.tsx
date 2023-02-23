import { Box, Text } from '@chakra-ui/react';
import { getYear } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { type GetCVResponse } from '~/store/api/CV/cv.types';

import { CVHeading } from './CVHeading';

export const HardSkills = ({ cv }: { cv: GetCVResponse }) => {
  const [t] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.hard_skills`)} />
      {cv.profile.hard_skills?.map((skill) => (
        <Box key={skill.name}>
          <Text
            mt={3}
            fontSize="lg"
            color="brand.black"
          >
            {skill.name}
          </Text>
          <Text
            color="brand.lightGray"
            as="span"
          >
            {t('domains:employee.titles.experience', {
              count:
                getYear(new Date(Date.now())) -
                getYear(new Date(skill.created_at))
            })}
          </Text>
        </Box>
      ))}
    </>
  );
};
