import { Icon } from '@chakra-ui/react';
import {
  type ChakraStylesConfig,
  type GroupBase,
  type DropdownIndicatorProps,
  type MultiValueRemoveProps,
  type Props as SelectProps,
  type SelectComponentsConfig,
  chakraComponents,
  Select as ChakraSelect
} from 'chakra-react-select';
import { MdClose, MdExpandMore } from 'react-icons/md';
import { type ClearIndicatorProps } from 'react-select';

import { SelectStyles } from '~/shared/ui/components/Select/select.styles';

const components: SelectComponentsConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  ClearIndicator: (props: ClearIndicatorProps) => (
    <chakraComponents.ClearIndicator {...props}>
      <Icon
        as={MdClose}
        w={4}
        h={4}
      />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props: DropdownIndicatorProps) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdExpandMore} />
    </chakraComponents.DropdownIndicator>
  ),
  MultiValueRemove: (props: MultiValueRemoveProps) => (
    <chakraComponents.MultiValueRemove {...props}>
      <Icon
        as={MdClose}
        w={5}
        h={5}
      />
    </chakraComponents.MultiValueRemove>
  )
};

export const Select = <Option, IsMulti extends boolean = false>(
  selectProps: Omit<SelectProps<Option, IsMulti>, 'chakraStyles'>
) => (
  <ChakraSelect
    chakraStyles={SelectStyles as ChakraStylesConfig<Option, IsMulti>}
    {...selectProps}
    components={
      components as SelectComponentsConfig<Option, IsMulti, GroupBase<Option>>
    }
  />
);
