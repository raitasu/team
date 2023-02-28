import { Text, Box } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
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

  return (
    <>
      <CVHeading text={t('domains:cv.blocks.work_experiences')} />
      {field.value.work_experiences.map((workExperience, index) => (
        <Box key={workExperience.id}>
          <EditWrapper
            isInline
            onClick={() =>
              setRegisteredField(`profile.work_experiences.${index}.started_at`)
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
              {workExperience.ended_at === '' ? '...' : workExperience.ended_at}
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
              {workExperience.company_name}
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
      ))}
    </>
  );
};
