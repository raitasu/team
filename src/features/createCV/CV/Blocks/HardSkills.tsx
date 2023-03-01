import { Box, Text } from '@chakra-ui/react';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { DeleteWrapper } from '../Edit/DeleteWrapper';
import { EditWrapper } from '../Edit/EditWrapper';

export const HardSkills = ({
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
    name: 'profile.hard_skills'
  });

  return (
    <>
      <CVHeading
        text={t(`domains:cv.blocks.hard_skills`)}
        addHandler={() => {
          append({ name: 'xxx', years_of_experience: 'XX years' });
        }}
      />
      {field.value.hard_skills?.map((skill, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={skill.name}
        >
          <Box mt={3}>
            <EditWrapper
              onClick={() =>
                setRegisteredField(`profile.hard_skills.${index}.name`)
              }
            >
              <Text
                fontSize="lg"
                color="brand.black"
              >
                {skill.name}
              </Text>
            </EditWrapper>
            <EditWrapper
              onClick={() =>
                setRegisteredField(
                  `profile.hard_skills.${index}.years_of_experience`
                )
              }
            >
              <Text
                color="brand.lightGray"
                as="span"
              >
                {skill.years_of_experience}
              </Text>
            </EditWrapper>
          </Box>
        </DeleteWrapper>
      ))}
    </>
  );
};
