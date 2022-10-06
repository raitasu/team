import { ChakraStylesConfig } from 'chakra-react-select';

export const SelectStyles: ChakraStylesConfig = {
  container: (provided, { selectProps }) => ({
    ...provided,
    cursor: selectProps.isDisabled ? 'not-allowed' : 'pointer'
  }),
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
    border: '1px solid var(--chakra-colors-brand-stroke)',
    borderRadius: '4px',
    padding: '4px 8px',
    color: 'brand.darkGray',
    marginRight: '4px'
  }),
  placeholder: () => ({
    color: 'brand.lightGray'
  })
};
