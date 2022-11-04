export const Table = {
  variants: {
    simple: {
      overflow: 'hidden',
      padding: '12px',
      thead: {
        backgroundColor: 'var(--chakra-colors-brand-background2)',
        zIndex: 'var(--chakra-zIndices-docked)',
        position: 'sticky',
        top: 0
      },
      tbody: {
        tr: {
          _hover: {
            bg: 'var(--chakra-colors-brand-background1)'
          }
        }
      },
      tr: {
        th: {
          color: 'var(--chakra-colors-brand-headline)',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '120%',
          textTransform: 'none'
        },
        td: {
          color: 'var(--chakra-colors-brand-body)',
          fontSize: '16px',
          lineHeight: '120%'
        }
      }
    }
  }
};
