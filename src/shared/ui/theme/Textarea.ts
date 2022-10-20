export const Textarea = {
  baseStyle: {
    color: 'brand.ghostGray',
    _placeholder: {
      color: 'brand.lightGray'
    }
  },
  variants: {
    outline: {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'brand.stroke',
      border: null,
      _hover: {
        borderColor: 'brand.lightGray'
      },
      _focus: {
        borderColor: 'brand.ghostGray'
      }
    }
  },
  defaultProps: {
    focusBorderColor: 'none',
    errorBorderColor: 'brand.accentRed'
  }
};
