export const Alert = {
  baseStyle: {
    container: {
      width: '463px',
      height: '95px',
      border: '1px solid',
      borderRadius: '4px'
    },
    title: {
      color: 'brand.headline',
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '120%'
    },
    description: {
      color: 'brand.body',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '120%'
    },
    icon: {
      color: 'brand.body',
      width: '20px',
      height: '20px'
    }
  },
  variants: {
    solid: {
      container: {
        bg: 'brand.background2',
        borderColor: 'brand.stroke'
      }
    },
    subtle: {
      container: {
        bg: 'brand.background2',
        borderColor: 'brand.accentRed'
      },
      icon: {
        color: 'brand.accentRed'
      }
    }
  },
  defaultProps: {
    variant: 'solid'
  }
};
