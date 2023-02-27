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
    primaryOutline: {
      color: 'brand.accentRed',
      bg: 'brand.background2',
      boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)',
      _hover: {
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-darkGray)'
      },
      _active: {
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-ghostGray)',
        color: 'brand.headline'
      },
      _disabled: {
        color: 'brand.lightGray',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)',
        _hover: {
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)'
        },
        _active: {
          color: 'brand.lightGray'
        }
      }
    },
    secondaryOutline: {
      color: 'brand.accentRed',
      bg: 'brand.background2',
      border: '1px solid var(--chakra-colors-brand-stroke)',
      _hover: {
        border: '1px solid var(--chakra-colors-brand-lightGray)'
      },
      _active: {
        border: '1px solid var(--chakra-colors-brand-ghostGray)',
        color: 'brand.headline'
      },
      _disabled: {
        color: 'brand.lightGray',
        border: '1px solid var(--chakra-colors-brand-stroke)',
        _hover: {
          border: '1px solid var(--chakra-colors-brand-stroke)'
        },
        _active: {
          color: 'brand.lightGray'
        }
      }
    },
    secondaryGhost: {
      color: 'brand.ghostGray',
      paddingLeft: '0',
      paddingRight: '0',
      _hover: {
        color: 'brand.darkGray'
      },
      _active: {
        color: 'brand.headline'
      },
      _disabled: {
        color: 'brand.lightGray',
        _hover: {
          color: 'brand.lightGray'
        },
        _active: {
          color: 'brand.lightGray'
        }
      }
    },
    primaryGhost: {
      color: 'brand.accentRed',
      paddingLeft: '0',
      paddingRight: '0',
      _hover: {
        color: 'brand.ghostGray'
      },
      _active: {
        color: 'brand.headline'
      },
      _disabled: {
        color: 'brand.lightGray',
        _hover: {
          color: 'brand.lightGray'
        }
      }
    },
    primary: {
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
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)',
        _active: {
          color: 'brand.lightGray'
        }
      }
    },
    iconButton: {
      width: '48px',
      height: '32px',
      color: 'brand.ghostGray',
      bg: 'brand.background2',
      boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)',
      _hover: {
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-ghostGray)'
      },
      _active: {
        color: 'brand.headline',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-headline)'
      },
      _disabled: {
        color: 'brand.lightGray',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-lightGray)',
        _hover: {
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-lightGray)'
        },
        _active: {
          color: 'brand.lightGray',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-lightGray)'
        }
      }
    },
    iconButtonSmallPrimary: {
      width: '24px',
      height: '24px',
      minWidth: '24px',
      px: '0',
      bg: 'inherit',
      color: 'brand.accentRed',
      _disabled: {
        color: 'brand.lightGray'
      }
    },
    iconButtonSmall: {
      width: '24px',
      height: '24px',
      minWidth: '24px',
      px: '0',
      bg: 'inherit',
      color: 'brand.body',
      _disabled: {
        color: 'brand.lightGray'
      }
    },
    asLink: {
      display: 'inline',
      height: 0,
      padding: 0,
      paddingInlineStart: 0,
      paddingInlineEnd: 0,
      color: 'brand.headline2',
      fontSize: '16px',
      textTransform: 'none',
      textDecoration: 'underline'
    }
  },
  defaultProps: {
    variant: 'primary',
    size: 'sm'
  }
};
