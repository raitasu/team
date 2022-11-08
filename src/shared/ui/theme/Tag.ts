export const Tag = {
  baseStyle: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '400',
      borderRadius: '4px',
      border: '1px solid',
      borderColor: 'brand.stroke',
      svg: {
        color: 'brand.lightGray',
        marginInlineEnd: '4px'
      }
    },
    label: {
      lineHeight: '120%'
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
        padding: '2px 7px',
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
        padding: '2.5px 7px',
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
        padding: '5px 12px',
        svg: {
          w: '20px',
          h: '20px'
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
        backgroundColor: 'brand.white'
      }
    },
    colorCloseBtn: {
      container: {
        color: 'brand.ghostGray',
        backgroundColor: 'brand.white',
        svg: {
          w: '20px',
          h: '20px',
          marginInlineEnd: '0',
          color: 'brand.ghostGray'
        },
        button: {
          svg: {
            w: '20px',
            h: '20px',
            marginInlineEnd: '0',
            color: 'brand.accentRed'
          }
        }
      }
    }
  },
  defaultProps: {}
};
