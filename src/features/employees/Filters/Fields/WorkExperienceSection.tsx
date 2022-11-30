import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { WorkExperienceField } from '~/features/employees/Filters/Fields/WorkExperienceField';
import { FormControl } from '~/shared/ui/components/FormControl';

export const WorkExperienceSection = () => {
  const {
    formState: { errors }
  } = useFormContext();
  const [t] = useTranslation();
  const errorMessage = (errors.work_experience_start?.message ||
    errors.work_experience_end?.message) as
    | 'invalid_number'
    | 'invalid_range'
    | undefined;

  return (
    <FormControl
      label={t('domains:filters.work_experience')}
      errorMessage={
        errorMessage !== undefined ? t(`general_errors:${errorMessage}`) : ''
      }
    >
      <Flex justifyContent="space-between">
        <WorkExperienceField
          name="work_experience_start"
          placeholder={t('domains:filters.placeholders.placeholder_from')}
        />
        <WorkExperienceField
          name="work_experience_end"
          placeholder={t('domains:filters.placeholders.placeholder_to')}
        />
      </Flex>
    </FormControl>
  );
};
