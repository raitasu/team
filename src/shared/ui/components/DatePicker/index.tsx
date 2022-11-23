import { enGB, ru } from 'date-fns/locale';
import ReactDatePicker, {
  type ReactDatePickerProps,
  registerLocale
} from 'react-datepicker';
import { useTranslation } from 'react-i18next';

import {
  DateInput,
  DatePickerHeader
} from '~/shared/ui/components/DatePicker/datepicker.components';

registerLocale('en', enGB);
registerLocale('ru', ru);

export const DatePicker = <
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined
>({
  customInput = <DateInput />,
  dateFormat = 'dd.MM.yyyy',
  formatWeekDay = (nameOfDay) => nameOfDay.slice(0, 1),
  renderCustomHeader = (headerProps) => <DatePickerHeader {...headerProps} />,
  showPopperArrow: shouldShowPopperArrow = false,
  ...pathThroughProps
}: Omit<
  ReactDatePickerProps<CustomModifierNames, WithRange>,
  'locale' | 'className'
>) => {
  const [, { language }] = useTranslation();

  return (
    <ReactDatePicker
      {...pathThroughProps}
      className="calendar-container"
      customInput={customInput}
      dateFormat={dateFormat}
      formatWeekDay={formatWeekDay}
      locale={language}
      renderCustomHeader={renderCustomHeader}
      showPopperArrow={shouldShowPopperArrow}
    />
  );
};
