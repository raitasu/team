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

export const Education = ({
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
    name: 'profile.educations'
  });

  return (
    <>
      <CVHeading
        text={t(`domains:cv.blocks.educations`)}
        addHandler={() => {
          append({
            id: Date.now(),
            university_name: 'xxx',
            speciality: 'xxx',
            started_at: 'xxx',
            graduated_at: 'xxx',
            country: 'xxx',
            degree: 'xxx'
          });
        }}
      />
      {field.value.educations?.map((education, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={education.id}
        >
          <Box>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(`profile.educations.${index}.started_at`)
              }
            >
              <Text
                mt={7}
                mb={2}
                fontSize="lg"
                color="brand.black"
              >
                {education.started_at === '' ? '...' : education.started_at}
              </Text>
            </EditWrapper>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(`profile.educations.${index}.graduated_at`)
              }
            >
              <Text
                mt={7}
                mb={2}
                fontSize="lg"
                color="brand.black"
              >
                &nbsp;-{' '}
                {education.graduated_at === '' ? '...' : education.graduated_at}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(
                  `profile.educations.${index}.university_name`
                )
              }
            >
              <Text
                fontWeight="900"
                fontSize="xl"
                color="brand.black"
              >
                {education.university_name}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(`profile.educations.${index}.country`)
              }
            >
              <Text
                fontSize="lg"
                mb={2}
                color="brand.lightGray"
              >
                {education.country === null || education.country === ''
                  ? '...'
                  : education.country}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(`profile.educations.${index}.degree`)
              }
            >
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
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(`profile.educations.${index}.speciality`)
              }
            >
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
            </EditWrapper>
          </Box>
        </DeleteWrapper>
      ))}
    </>
  );
};
