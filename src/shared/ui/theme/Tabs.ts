export const Tabs = {
  variants: {
    line: {
      root: {
        bg: 'brand.background2',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        scrollX: 'auto'
      },
      tablist: {
        backgroundColor: 'brand.background2',
        padding: '0 20px',
        borderBottomWidth: '1px',
        overflowX: 'auto',
        overflowY: 'hidden',
        flexShrink: 0
      },
      tab: {
        bg: 'inherit',
        borderColor: 'inherit',
        borderBottomWidth: '1px',
        mb: '-1px',
        fontWeight: '400',
        fontSize: '18px',
        color: 'brand.body',
        cursor: 'pointer',
        padding: '20px',
        whiteSpace: 'nowrap',
        _selected: {
          borderColor: 'brand.accentRed',
          fontWeight: '500',
          fontSize: '18px',
          lineHeight: '120%',
          color: 'brand.headline'
        }
      },
      tabpanels: {
        flex: '1',
        overflow: 'auto'
      },
      tabpanel: {
        padding: '0'
      }
    }
  }
};
