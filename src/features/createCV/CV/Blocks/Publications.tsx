import { Text, Box } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { EditWrapper } from '../Edit/EditWrapper';

export const Publications = ({
  setRegisteredField
}: {
  setRegisteredField: (fieldName: CVRegisterField | null) => void;
}) => {
  const [t] = useTranslation();
  const { field } = useController<CVFormValues, 'profile'>({
    name: 'profile'
  });

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.publications`)} />
      {field.value.publications.map((publication, index) => (
        <Box key={publication.id}>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.publications.${index}.start_date`)
            }
          >
            <Text
              mt={7}
              mb={1}
              fontSize="lg"
              color="brand.black"
            >
              {publication.start_date}
            </Text>
          </EditWrapper>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.publications.${index}.name`)
            }
          >
            <Text
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {publication.name}
            </Text>
          </EditWrapper>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.publications.${index}.description`)
            }
          >
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
          </EditWrapper>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.publications.${index}.url`)
            }
          >
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
          </EditWrapper>
        </Box>
      ))}
    </>
  );
};
