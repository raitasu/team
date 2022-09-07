export const Tabs = {
  variants: {
    line: {
      tab: {
        fontWeight: '400',
        fontSize: '16px',
        color: 'brand.body',
        cursor: 'pointer',
        _selected: {
          borderColor: 'brand.accentRed',
          fontWeight: '400',
          fontSize: '18px',
          lineHeight: '120%',
          color: 'brand.headline'
        }
      }
    }
  }
};
