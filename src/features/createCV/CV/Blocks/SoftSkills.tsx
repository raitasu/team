import { Text } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { EditWrapper } from '../Edit/EditWrapper';

export const SoftSkills = ({
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
      <CVHeading text={t(`domains:cv.blocks.soft_skills`)} />
      {field.value.soft_skills.map((skill, index) => (
        <EditWrapper
          key={skill.id}
          onClick={() =>
            setRegisteredField(`profile.soft_skills.${index}.name`)
          }
        >
          <Text
            mt={3}
            mb={3}
            fontSize="lg"
            color="brand.black"
          >
            {skill.name}
          </Text>
        </EditWrapper>
      ))}
    </>
  );
};
