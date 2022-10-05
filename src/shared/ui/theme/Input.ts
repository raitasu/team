export const Input = {
  baseStyle: {},
  variants: {
    outline: {
      field: {
        fontSize: '16px',
        bg: 'transparent',
        borderRadius: '4px',
        color: 'brand.ghostGray',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'brand.stroke',
        _hover: {
          borderColor: 'brand.lightGray'
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
    focusBorderColor: 'brand.ghostGray',
    errorBorderColor: 'brand.accentRed'
  }
};
