export const Input = {
  baseStyle: {
    field: {
      fontWeight: '400',
      lineHeight: '120%',
      fontSize: '16px',
      bg: 'transparent',
      borderRadius: '4px',
      border: '1px solid brand.stroke',
      color: 'brand.ghostGray',
      _hover: {
        borderColor: 'brand.lightGray'
      },
      _placeholder: {
        color: 'brand.lightGray'
      }
    }
  },
  defaultProps: {
    focusBorderColor: 'brand.ghostGray',
    errorBorderColor: 'brand.accentRed'
  }
};
