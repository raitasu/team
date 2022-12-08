export const Alert = {
  baseStyle: {
    container: {
      gap: '3.5',
      width: '400px',
      height: 'none',
      padding: '4',
      borderRadius: 'md',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      border: '1px solid',
      bg: 'brand.background2',
      alignItems: 'center'
    },
    title: {
      color: 'brand.headline',
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '120%'
    },
    description: {
      color: 'brand.gray700',
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
    editModal: {
      container: {
        gap: '3.5',
        width: '400px',
        height: 'none',
        padding: '4px 0',
        borderRadius: 'none',
        boxShadow: 'none',
        border: 'none',
        bg: 'brand.background2',
        alignItems: 'center'
      }
    }
  }
};
