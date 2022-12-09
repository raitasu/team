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
        _focusVisible: {
          borderColor: 'brand.ghostGray',
          boxShadow: 'none'
        },
        _placeholder: {
          color: 'brand.lightGray'
        },
        _disabled: {
          _hover: {
            borderColor: 'brand.stroke'
          }
        }
      },
      clearIndicator: {
        display: 'flex',
        marginLeft: '4px',
        marginRight: '8px',
        bg: 'brand.ghostGray'
      }
    },
    datePickerInput: {
      field: {
        width: '106px',
        height: 'inherit',
        fontSize: '12px',
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
    focusBorderColor: 'none',
    errorBorderColor: 'brand.accentRed'
  }
};
