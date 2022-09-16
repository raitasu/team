export const Button = {
  baseStyle: {
    padding: '10px 14px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontWeight: '500',
    lineHeight: '16px',
    fontSize: '14px',
    bg: 'transparent'
  },
  sizes: {},
  variants: {
    secondaryOutline: {
      color: 'brand.accentRed',
      border: '1px',
      borderColor: 'brand.stroke',
      _active: {
        borderColor: 'brand.ghostGray',
        color: 'brand.headline'
      },
      _hover: {
        borderColor: 'brand.darkGray'
      },
      _disabled: {
        color: 'brand.lightGray',
        border: '1px',
        borderColor: 'brand.stroke'
      }
    },
    secondary: {
      color: 'brand.ghostGray',
      border: '1px solid transparent',
      _hover: {
        border: '1px',
        borderColor: 'brand.stroke'
      },
      _active: {
        color: 'brand.headline',
        borderColor: 'brand.headline'
      },
      _disabled: {
        color: 'brand.lightGray'
      }
    },
    main: {
      bg: 'brand.accentRed',
      color: 'white',
      _hover: {
        bg: 'brand.burntSienna'
      },
      _active: {
        bg: 'brand.crusta',
        color: 'brand.headline'
      },
      _disabled: {
        bg: 'brand.ghostWhite',
        color: 'brand.lightGray',
        border: '1px',
        borderColor: 'brand.stroke'
      }
    }
  },
  defaultProps: {
    variant: 'main'
  }
};
