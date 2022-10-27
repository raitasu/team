export const NumberInput = {
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
        backgroundColor: 'brand.white',
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
          opacity: '1',
          color: 'brand.stroke',
          _hover: {
            borderColor: 'brand.stroke'
          }
        },
        _focusVisible: {
          borderColor: 'brand.lightGray',
          boxShadow: 'brand.lightGray'
        }
      },
      stepperGroup: {
        width: '20px',
        marginRight: '12px'
      },
      stepper: {
        border: 'none',
        color: 'brand.ghostGray',
        _last: {
          marginTop: '-5px'
        }
      }
    }
  }
};
