import { Box, Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
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

  return (
    <>
      <CVHeading text={t(`domains:cv.blocks.hard_skills`)} />
      {field.value.hard_skills.map((skill, index) => (
        <Box
          key={skill.name}
          mt={3}
        >
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.hard_skills.${index}.name`)
            }
          >
            <Text
              fontSize="lg"
              color="brand.black"
            >
              {field.value.hard_skills[index].name}
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
      ))}
    </>
  );
};
