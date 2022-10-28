export const Tag = {
  baseStyle: {
    container: {
      fontWeight: '400',
      borderRadius: '4px',
      border: '1px solid',
      borderColor: 'brand.stroke',
      svg: {
        color: 'brand.lightGray',
        marginInlineEnd: '4px'
      }
    },
    closeButton: {
      marginStart: '4px',
      marginEnd: '0',
      opacity: '1',
      svg: {
        marginInlineStart: '0',
        marginInlineEnd: '0'
      }
    }
  },
  sizes: {
    sm: {
      container: {
        minH: '20px',
        minW: '44px',
        fontSize: '12px',
        padding: '3px 7px',
        svg: {
          w: '12px',
          h: '12px'
        }
      },
      closeButton: {
        w: '12px',
        h: '12px'
      }
    },
    md: {
      container: {
        minH: '24px',
        minW: '49px',
        fontSize: '14px',
        padding: '4px 7px',
        svg: {
          w: '16px',
          h: '16px'
        }
      },
      closeButton: {
        w: '16px',
        h: '16px'
      }
    },
    lg: {
      container: {
        minH: '32px',
        minW: '61px',
        fontSize: '16px',
        padding: '7px 12px',
        svg: {
          w: '18px',
          h: '18px'
        }
      },
      closeButton: {
        w: '20px',
        h: '20px',
        svg: {
          w: '20px',
          h: '20px'
        }
      }
    }
  },
  variants: {
    subtle: {
      container: {
        color: 'brand.ghostGray',
        backgroundColor: 'brand.white',
        lineHeight: '120%'
      }
    }
  },
  defaultProps: {}
};
