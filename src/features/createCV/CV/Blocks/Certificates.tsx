import { Text, Box } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { EditWrapper } from '../Edit/EditWrapper';

export const Certificates = ({
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
      <CVHeading text={t(`domains:cv.blocks.certificates`)} />
      {field.value.certificates.map((certificate, index) => (
        <Box key={certificate.id}>
          <EditWrapper
            isInline
            onClick={() =>
              setRegisteredField(`profile.certificates.${index}.start_date`)
            }
          >
            <Text
              mt={5}
              mb={1}
              fontSize="lg"
              color="brand.black"
            >
              {certificate.start_date === '' ? '...' : certificate.start_date}
            </Text>
          </EditWrapper>
          <EditWrapper
            isInline
            onClick={() =>
              setRegisteredField(`profile.certificates.${index}.end_date`)
            }
          >
            <Text
              mt={5}
              mb={1}
              fontSize="lg"
              color="brand.black"
            >
              &nbsp;-{' '}
              {certificate.end_date === '' ? '...' : certificate.end_date}
            </Text>
          </EditWrapper>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.certificates.${index}.name`)
            }
          >
            <Text
              fontWeight="900"
              fontSize="xl"
              color="brand.black"
            >
              {certificate.name}
            </Text>
          </EditWrapper>
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.certificates.${index}.link`)
            }
          >
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
          </EditWrapper>
        </Box>
      ))}
    </>
  );
};
