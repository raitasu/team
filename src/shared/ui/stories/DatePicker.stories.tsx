import React from 'react';

import { Box, HStack } from '@chakra-ui/react';

import { DatePicker } from '../components/DatePicker';

export default {
  title: 'UI/Datepicker',
  component: DatePicker
};

export const Variants = () => {
  const [singleDate, setSingleDate] = React.useState<Date | null>(null);
  const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([
    null,
    null
  ]);

  return (
    <HStack
      margin="40px"
      width="600px"
    >
      <Box margin-right="20px">
        <DatePicker
          placeholderText="Simple calendar"
          selected={singleDate}
          onChange={(date) => {
            setSingleDate(date);
          }}
        />
      </Box>
      <Box>
        <DatePicker
          placeholderText="Calendar with range"
          onChange={(range) => {
            setDateRange(range);
          }}
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          selectsRange
          isClearable
        />
      </Box>
    </HStack>
  );
};
