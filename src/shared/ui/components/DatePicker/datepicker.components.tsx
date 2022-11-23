import React from 'react';

import {
  type InputProps,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react';
import { type ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { useTranslation } from 'react-i18next';
import { MdOutlineCalendarToday } from 'react-icons/md';

import { optionMonth } from '~/shared/ui/components/DatePicker/utils';
import { Select } from '~/shared/ui/components/Select';

export const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <InputGroup ref={ref}>
      <InputLeftElement
        pointerEvents="none"
        color="brand.lightGray"
      >
        <MdOutlineCalendarToday size="20px" />
      </InputLeftElement>
      <Input {...props} />
    </InputGroup>
  )
);

export const DatePickerHeader = ({
  changeMonth,
  changeYear,
  date
}: ReactDatePickerCustomHeaderProps) => {
  const [t] = useTranslation();

  return (
    <div className="calendar-container__custom-header custom-header">
      <Select
        className="custom-header__select"
        placeholder={t('components:datepicker.placeholder.month')}
        options={optionMonth}
        getOptionLabel={(option) => t(option.label)}
        size="sm"
        value={optionMonth.find(({ value }) => value === date.getMonth())}
        onChange={(option) => {
          if (option !== null) {
            changeMonth(option.value);
          }
        }}
      />
      <Input
        placeholder={t('components:datepicker.placeholder.year')}
        variant="datePickerInput"
        type="number"
        value={date.getFullYear() || ''}
        onChange={({ target }) => changeYear(Number(target.value))}
      />
    </div>
  );
};
