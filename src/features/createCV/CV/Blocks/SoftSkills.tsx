import { Text } from '@chakra-ui/react';
import { useController, useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  type CVFormValues,
  type CVRegisterField
} from '~/features/createCV/cv.schema';

import { CVHeading } from './CVHeading';
import { DeleteWrapper } from '../Edit/DeleteWrapper';
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
  const { control } = useFormContext<CVFormValues>();
  const { append, remove } = useFieldArray({
    control,
    name: 'profile.soft_skills'
  });

  return (
    <>
      <CVHeading
        text={t(`domains:cv.blocks.soft_skills`)}
        addHandler={() => {
          append({ id: Date.now(), name: 'xxx' });
        }}
      />
      {field.value.soft_skills?.map((skill, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={skill.id}
        >
          <EditWrapper
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
        </DeleteWrapper>
      ))}
    </>
  );
};
