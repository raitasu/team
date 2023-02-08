import { type ChangeEvent, useMemo } from 'react';

import { Box } from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '~/shared/ui/components/Checkbox';
import { FormControl } from '~/shared/ui/components/FormControl';
import { type HardSkill } from '~/store/api/employees/employees.types';

import { type EmployeeHardSkillsFormValues } from '../EditHardSkillsInfo.schemas';

export const HardSkillCheckboxField = ({ skill }: { skill: HardSkill }) => {
  const [t] = useTranslation();

  const { field } = useController<EmployeeHardSkillsFormValues, `skills`>({
    name: `skills`
  });

  const currentHardSkill = useMemo(
    () => field.value.find((el) => el.id === skill.id),
    [field.value, skill.id]
  );

  return (
    <Box>
      <FormControl>
        <Checkbox
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            field.onChange(
              field.value.map((el) => {
                if (el.id === skill.id) {
                  return { ...el, is_show: event.currentTarget.checked };
                }

                return el;
              })
            );
          }}
          isChecked={currentHardSkill?.is_show}
          label={`${skill.name} (${t('domains:employee.titles.experience', {
            count: skill.years_of_experience
          })})`}
        />
      </FormControl>
    </Box>
  );
};
