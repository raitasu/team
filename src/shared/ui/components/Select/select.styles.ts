import { ChakraStylesConfig } from 'chakra-react-select';

export const SelectStyles: ChakraStylesConfig = {
  container: (provided, { selectProps }) => ({
    ...provided,
    cursor: selectProps.isDisabled ? 'not-allowed' : 'pointer'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
    bg: 'transparent',
    paddingLeft: state.selectProps.menuIsOpen ? '16px' : 0,
    paddingRight: state.selectProps.menuIsOpen ? 0 : '16px',
    position: 'static'
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
    color: 'brand.body',
    marginRight: '4px',
    marginTop: '2px',
    marginBottom: '2px'
  }),
  placeholder: () => ({
    color: 'brand.lightGray'
  })
};
