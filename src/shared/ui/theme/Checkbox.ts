export const Checkbox = {
  baseStyle: {
    control: {
      boxSize: '18px',
      color: 'brand.ghostGray',
      border: 'none',
      _checked: {
        color: 'brand.headline2',
        bgColor: 'transparent',
        _hover: {
          bgColor: 'transparent'
        }
      },
      _disabled: {
        color: 'brand.stroke',
        bgColor: 'transparent',
        _checked: {
          color: 'brand.stroke',
          bgColor: 'transparent'
        }
      }
    },
    label: {
      cursor: 'pointer',
      fontWeight: '400',
      lineHeight: '19px',
      fontSize: '16px',
      color: 'brand.ghostGray',
      _checked: {
        bgColor: 'transparent'
      },
      _disabled: {
        opacity: 1
      }
    }
  },
  sizes: {},
  variants: {},
  defaultProps: {}
};
