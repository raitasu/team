export const Modal = {
  baseStyle: {
    header: {
      color: 'brand.headline',
      fontWeight: '700',
      fontSize: '20px',
      lineHeight: '120%'
    },
    dialog: {
      maxHeight: 'calc(100vh - 40px)',
      margin: 0
    },
    dialogContainer: {
      display: 'flex',
      maxHeight: '100%',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    body: {
      flex: 1,
      overflow: 'auto'
    }
  }
};
