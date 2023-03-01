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

export const WorkExperience = ({
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
    name: 'profile.work_experiences'
  });

  return (
    <>
      <CVHeading
        text={t('domains:cv.blocks.work_experiences')}
        addHandler={() => {
          append({
            id: Date.now(),
            project_name: 'xxx',
            company_name: 'xxx',
            description: 'xxx',
            responsibilities: 'xxx',
            environment: 'xxx',
            position: 'xxx',
            started_at: 'xxx',
            ended_at: 'xxx'
          });
        }}
      />
      {field.value.work_experiences?.map((workExperience, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={workExperience.id}
        >
          <Box>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.started_at`
                )
              }
            >
              <Text
                mt={7}
                mb={2}
                fontSize="lg"
                color="brand.black"
              >
                {workExperience.started_at === ''
                  ? '...'
                  : workExperience.started_at}
              </Text>
            </EditWrapper>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(`profile.work_experiences.${index}.ended_at`)
              }
            >
              <Text
                mt={7}
                mb={2}
                fontSize="lg"
                color="brand.black"
              >
                &nbsp;-{' '}
                {workExperience.ended_at === ''
                  ? '...'
                  : workExperience.ended_at}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(`profile.work_experiences.${index}.position`)
              }
            >
              <Text
                fontWeight="900"
                fontSize="xl"
                color="brand.black"
              >
                {workExperience.position}
              </Text>
            </EditWrapper>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.project_name`
                )
              }
            >
              <Text
                fontSize="xl"
                mb={2}
                color="brand.lightGray"
              >
                {workExperience.project_name}
              </Text>
            </EditWrapper>
            <EditWrapper
              isInline
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.company_name`
                )
              }
            >
              <Text
                fontSize="xl"
                mb={2}
                color="brand.lightGray"
              >
                &nbsp;({workExperience.company_name})
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.description`
                )
              }
            >
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
                {workExperience.description}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.responsibilities`
                )
              }
            >
              <Box mt={1}>
                <Text
                  as="span"
                  fontWeight="900"
                  fontSize="xl"
                  color="brand.black"
                >
                  {`${t('domains:cv.titles.responsibilities')}: `}
                </Text>
                <Text
                  fontSize="xl"
                  as="span"
                  color="brand.black"
                >
                  {workExperience.responsibilities}
                </Text>
              </Box>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(
                  `profile.work_experiences.${index}.environment`
                )
              }
            >
              <Box mt={1}>
                <Text
                  as="span"
                  fontWeight="900"
                  fontSize="xl"
                  color="brand.black"
                >
                  {`${t('domains:cv.titles.environment')}: `}
                </Text>
                <Text
                  fontSize="xl"
                  as="span"
                  color="brand.black"
                >
                  {workExperience.environment}
                </Text>
              </Box>
            </EditWrapper>
          </Box>
        </DeleteWrapper>
      ))}
    </>
  );
};
