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
    secondaryGhost: {
      color: 'brand.ghostGray',
      _hover: {
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-stroke)'
      },
      _active: {
        color: 'brand.headline',
        boxShadow: '0 0 0 1px var(--chakra-colors-brand-headline)'
      },
      _disabled: {
        color: 'brand.lightGray',
        _hover: {
          boxShadow: 'none'
        },
        _active: {
          color: 'brand.lightGray'
        }
      }
    },
    primaryGhost: {
      color: 'brand.accentRed',
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
    }
  },
  defaultProps: {
    variant: 'primary'
  }
};
