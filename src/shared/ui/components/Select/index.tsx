import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  chakraComponents,
  type GroupBase,
  type Props as SelectProps,
  Select as ChakraSelect,
  CreatableSelect,
  type SelectComponent,
  type SelectComponentsConfig,
  type SelectInstance
} from 'chakra-react-select';
import { MdClose, MdExpandMore } from 'react-icons/md';

import { SelectStyles } from '~/shared/ui/components/Select/select.styles';

const components: SelectComponentsConfig<
  unknown,
  boolean,
  GroupBase<unknown>
> = {
  ClearIndicator: (props) => (
    <chakraComponents.ClearIndicator {...props}>
      <Icon
        as={MdClose}
        w={4}
        h={4}
      />
    </chakraComponents.ClearIndicator>
  ),
  DropdownIndicator: (props) => (
    <chakraComponents.DropdownIndicator {...props}>
      <Icon as={MdExpandMore} />
    </chakraComponents.DropdownIndicator>
  ),
  MultiValueRemove: (props) => (
    <chakraComponents.MultiValueRemove {...props}>
      <Icon
        as={MdClose}
        w={5}
        h={5}
      />
    </chakraComponents.MultiValueRemove>
  )
};

export const Select = React.forwardRef<SelectInstance, SelectProps>(
  (selectProps, ref) =>
    selectProps.isClearable ? (
      <CreatableSelect
        ref={ref}
        chakraStyles={SelectStyles}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 })
        }}
        menuPlacement="auto"
        {...selectProps}
        components={components}
      />
    ) : (
      <ChakraSelect
        ref={ref}
        chakraStyles={SelectStyles}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        styles={{
          menuPortal: (provided) => ({ ...provided, zIndex: 9999 })
        }}
        {...selectProps}
        components={components}
      />
    )
) as SelectComponent;
