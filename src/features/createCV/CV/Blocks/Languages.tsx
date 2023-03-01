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

export const Languages = ({
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
    name: 'profile.languages'
  });

  return (
    <>
      <CVHeading
        text={t(`domains:cv.blocks.languages`)}
        addHandler={() => {
          append({ id: Date.now(), name: 'xxx (xx)' });
        }}
      />
      {field.value.languages?.map((language, index) => (
        <DeleteWrapper
          onClick={() => {
            remove(index);
          }}
          key={language.id}
        >
          <EditWrapper
            onClick={() =>
              setRegisteredField(`profile.languages.${index}.name`)
            }
          >
            <Text
              pt={3}
              fontSize="lg"
              color="brand.black"
            >
              {language.name}
            </Text>
          </EditWrapper>
        </DeleteWrapper>
      ))}
    </>
  );
};
