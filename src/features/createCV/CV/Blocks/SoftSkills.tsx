import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type GetCVResponse } from '~/store/api/CV/cv.types';

import { CVHeading } from './CVHeading';

export const SoftSkills = ({ cv }: { cv: GetCVResponse }) => {
  const [t] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.soft_skills`)} />
      {cv.profile.soft_skills?.map((skill) => (
        <Text
          key={skill.name}
          mt={3}
          mb={3}
          fontSize="lg"
          color="brand.black"
        >
          {skill.name}
        </Text>
      ))}
    </>
  );
};
