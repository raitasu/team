import { Theme } from '@chakra-ui/react';
import { ChakraStylesConfig } from 'chakra-react-select';
import { GroupBase } from 'react-select/dist/declarations/src/types';

export const getSelectStyles: <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  theme: Theme
) => ChakraStylesConfig<Option, IsMulti, Group> = () => ({
  dropdownIndicator: (provided, { selectProps }) => ({
    ...provided,
    transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
    bg: 'transparent'
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'brand.body',
    backgroundColor: state.isSelected ? 'brand.stroke' : 'inherit',
    _hover: {
      backgroundColor: 'brand.stroke'
    }
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none'
  }),
  multiValue: () => ({
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '1px solid gray',
    borderRadius: '4px',
    padding: '4px 8px',
    color: 'brand.darkGray'
  })
});
