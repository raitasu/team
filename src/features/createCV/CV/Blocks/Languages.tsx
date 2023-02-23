import { Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type GetCVResponse } from '~/store/api/CV/cv.types';

import { CVHeading } from './CVHeading';

export const Languages = ({ cv }: { cv: GetCVResponse }) => {
  const [t] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.languages`)} />
      {cv.profile.languages?.map((lang) => (
        <Text
          key={lang.id}
          mt={3}
          mb={3}
          fontSize="lg"
          color="brand.black"
        >
          {lang.name}
          <Text
            as="span"
            color="brand.lightGray"
            ml={1}
          >
            ({t(`enums:language_level.${lang.level}`)})
          </Text>
        </Text>
      ))}
    </>
  );
};
