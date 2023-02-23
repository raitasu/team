import { Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DateFormats } from '~/shared/shared.constants';
import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type GetCVResponse } from '~/store/api/CV/cv.types';

import { CVHeading } from './CVHeading';

export const Publications = ({ cv }: { cv: GetCVResponse }) => {
  const [t, { language }] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.publications`)} />
      {cv.profile.publications?.map((publication) => (
        <Box key={publication.id}>
          <Text
            mt={7}
            mb={1}
            fontSize="lg"
            color="brand.black"
          >
            {getFormattedDate(
              publication.start_date,
              language,
              DateFormats.Full
            )}
          </Text>
          <Text
            fontWeight="900"
            fontSize="xl"
            color="brand.black"
          >
            {publication.name}
          </Text>
          <Box mt={1}>
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
              {publication.description}
            </Text>
          </Box>
          <Box mt={1}>
            <Text
              as="span"
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {`${t('domains:cv.titles.link')}: `}
            </Text>
            <Text
              fontSize="xl"
              as="span"
              color="brand.black"
            >
              {publication.url}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};
