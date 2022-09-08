export const Table = {
  variants: {
    simple: {
      table: {
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        bg: 'white'
      },
      tbody: {
        tr: {
          _hover: {
            bg: 'brand.background1'
          }
        }
      },
      tr: {
        th: {
          color: 'brand.headline',
          fontWeight: '500',
          fontSize: '14px',
          lineHeight: '120%',
          textTransform: 'none'
        },
        td: {
          color: 'brand.body',
          fontSize: '16px',
          lineHeight: '120%'
        }
      }
    }
  }
};
