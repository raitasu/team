import { Text, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { getFormattedDate } from '~/shared/utils/dates.utils';
import { type GetCVResponse } from '~/store/api/createCV/createCV.types';

import { CVHeading } from './CVHeading';

export const Certificates = ({ cv }: { cv: GetCVResponse }) => {
  const [t, { language }] = useTranslation();

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.certificates`)} />
      {cv.profile.certificates?.map((certificate) => (
        <Box key={certificate.name}>
          <Text
            mt={5}
            mb={1}
            fontSize="lg"
            color="brand.black"
          >
            {getFormattedDate(certificate.start_date, language)}
            {certificate.end_date
              ? ` - ${getFormattedDate(certificate.end_date, language)}`
              : ''}
          </Text>
          <Text
            fontWeight="900"
            fontSize="xl"
            color="brand.black"
          >
            {certificate.name}
          </Text>
          <Box>
            <Text
              as="span"
              fontWeight="900"
              fontSize="lg"
              color="brand.black"
            >
              {`${t('domains:cv.titles.link')}: `}
            </Text>
            <Text
              fontSize="lg"
              as="span"
              color="brand.black"
            >
              {certificate.link}
            </Text>
          </Box>
        </Box>
      ))}
    </>
  );
};
