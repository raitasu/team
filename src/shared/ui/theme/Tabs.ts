export const Tabs = {
  variants: {
    line: {
      tab: {
        bg: 'white',
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
