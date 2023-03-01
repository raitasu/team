import { Text, Box } from '@chakra-ui/react';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { DeleteWrapper } from '../Edit/DeleteWrapper';
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
  const { control } = useFormContext<CVFormValues>();
  const { append, remove } = useFieldArray({
    control,
    name: 'profile.certificates'
  });

  return (
    <>
      <CVHeading
        text={t(`domains:cv.blocks.certificates`)}
        addHandler={() => {
          append({
            id: Date.now(),
            name: 'xxx',
            issued_by: 'xxx',
            start_date: 'xxx',
            link: 'xxx',
            end_date: 'xxx'
          });
        }}
      />
      {field.value.certificates?.map((certificate, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={certificate.id}
        >
          <Box>
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
        </DeleteWrapper>
      ))}
    </>
  );
};
