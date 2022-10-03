import { ChakraStylesConfig } from 'chakra-react-select';

export const selectStyles: ChakraStylesConfig = {
  dropdownIndicator: (provided, { selectProps }) => ({
    ...provided,
    transform: `rotate(${selectProps.menuIsOpen ? -180 : 0}deg)`,
    bg: 'transparent'
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'brand.body',
    backgroundColor: state.isSelected ? '#E0E0E0' : 'inherit',
    background: state.isMulti ? '#E0E0E0' : 'red',
    _hover: {
      backgroundColor: '#E0E0E0'
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
};
