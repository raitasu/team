export const Input = {
  baseStyle: {},
  variants: {
    outline: {
      field: {
        fontSize: '16px',
        bg: 'white',
        borderRadius: '4px',
        color: 'brand.ghostGray',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'brand.stroke',
        _hover: {
          borderColor: 'brand.lightGray'
        },
        _focus: {
          borderColor: 'brand.ghostGray'
        },
        _placeholder: {
          color: 'brand.lightGray'
        },
        _disabled: {
          _hover: {
            borderColor: 'brand.stroke'
          }
        }
      }
    }
  },
  defaultProps: {
    focusBorderColor: 'none',
    errorBorderColor: 'brand.accentRed'
  }
};
