import { Grid, Input } from '@chakra-ui/react';
/* eslint-disable import/no-duplicates -- bug in library https://github.com/import-js/eslint-plugin-import/issues/1479 */
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
/* eslint-enable import/no-duplicates */
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP } from '~/features/employee/employee.styles';
import { type EmployeeGeneralInfoFormValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditGeneralInfo/editGeneralInfo.schemas';
import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const StartCareerField = () => {
  const [t] = useTranslation();
  const { field } = useController<EmployeeGeneralInfoFormValues, 'startCareer'>(
    {
      name: 'startCareer'
    }
  );

  const dateOfStartCareer = new Date(field.value);

  return (
    <FormControl
      label={t(
        'domains:employee.titles.profile_tabs.personal_information.general.start_career'
      )}
    >
      <Grid
        gridTemplateColumns="1fr 1fr"
        gap={COLUMN_GAP}
      >
        <Select
          defaultValue={optionMonth.find(
            (month) => month.value === getMonth(dateOfStartCareer)
          )}
          openMenuOnClick={false}
          getOptionLabel={(option) => t(option.label)}
        />
        <Input value={getYear(dateOfStartCareer)} />
      </Grid>
    </FormControl>
  );
};
