export const Checkbox = {
  baseStyle: {
    control: {
      boxSize: '18px',
      color: 'brand.ghostGray',
      _checked: {
        color: 'brand.headline2',
        bgColor: 'transparent',
        borderColor: 'none',
        _hover: {
          bgColor: 'transparent',
          borderColor: 'none'
        }
      },
      _disabled: {
        color: 'brand.lightGray',
        bgColor: 'transparent'
      }
    },
    label: {
      cursor: 'pointer',
      fontWeight: '400',
      lineHeight: '19px',
      fontSize: '16px',
      color: 'brand.ghostGray',
      _checked: {
        color: 'brand.headline2',
        bgColor: 'transparent'
      },
      _disabled: {
        color: 'brand.lightGray'
      }
    }
  },
  sizes: {},
  variants: {},
  defaultProps: {}
};
