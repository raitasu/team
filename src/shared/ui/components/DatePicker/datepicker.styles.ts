export const reactDatePickerStyles = {
  '.react-datepicker-popper': {
    width: '270px',
    padding: '20px 20px 15px 20px',
    backgroundColor: 'brand.white',
    border: '1px solid',
    borderColor: 'brand.stroke',
    borderRadius: '4px',
    zIndex: '1'
  },

  '.custom-header__select, .react-datepicker__day-name, .react-datepicker__month':
    {
      fontFamily: 'Roboto, sans-serif'
    },
  '.calendar-container__custom-header': {
    marginBottom: '24px'
  },
  '.custom-header': {
    display: 'flex',
    gap: '16px'
  },
  '.custom-header__select': {
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '14px',
    color: 'brand.ghostGray'
  },
  '.custom-header__select > div': {
    width: '106px',
    minHeight: '24px',
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '12px',
    lineHeight: '14px'
  },
  '.custom-header__select > div div': {
    fontSize: '12px',
    lineHeight: '14px'
  },
  '.custom-header__select > div div::-webkit-scrollbar': {
    display: 'none'
  },
  '.react-datepicker': {
    border: 'none'
  },
  '.react-datepicker__input-container': {
    position: 'relative',
    width: '100%'
  },
  '.react-datepicker__aria-live': {
    display: 'none'
  },
  '.react-datepicker-popper[data-placement^=bottom]': {
    paddingTop: '20px'
  },
  '.react-datepicker__header': {
    marginBottom: 0,
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none'
  },
  '.react-datepicker__day-names': {
    display: 'flex',
    marginBottom: 0
  },
  '.react-datepicker__day-name, .react-datepicker__month': {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '17px'
  },
  '.react-datepicker__day-name': {
    width: '32px',
    height: '32px',
    padding: '8px 7px 3px 8px',
    textAlign: 'center',
    color: 'brand.lightGray',
    textTransform: 'uppercase'
  },
  '.react-datepicker__month': {
    margin: 0
  },
  '.react-datepicker__week': {
    display: 'flex'
  },
  '.react-datepicker__day': {
    width: '32px',
    height: '32px',
    paddingTop: '8px',
    margin: '4px 0 4px 0',
    lineHeight: '17px',
    textAlign: 'center',
    color: 'brand.ghostGray'
  },
  '.react-datepicker__day:hover': {
    borderRadius: '50%',
    backgroundColor: 'brand.background1',
    cursor: 'pointer'
  },
  '.react-datepicker__day--selected, .react-datepicker__day--keyboard-selected':
    {
      backgroundColor: 'brand.accentRed',
      borderRadius: '50%',
      color: 'brand.white'
    },
  '.react-datepicker__day--selected.react-datepicker__day--in-range, .react-datepicker__day--range-start.react-datepicker__day, .react-datepicker__day--range-end.react-datepicker__day':
    {
      background:
        'radial-gradient(circle 16.5px, rgba(239, 69, 35, 1) 94%, rgba(248, 248, 250, 1))',
      color: 'brand.white'
    },
  '.react-datepicker__day--range-end.react-datepicker__day': {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: '100%',
    borderBottomRightRadius: '100%'
  },
  '.react-datepicker__day--range-start.react-datepicker__day': {
    borderTopLeftRadius: '100%',
    borderBottomLeftRadius: '100%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  '.react-datepicker__day--selected:hover, .react-datepicker__day--keyboard-selected:hover':
    {
      backgroundColor: 'brand.accentRed'
    },
  '.react-datepicker__day--selected:focus-visible': {
    border: 'none',
    outline: 'none'
  },
  '.react-datepicker__day--in-range, .react-datepicker__day--in-selecting-range.react-datepicker__day:not(.react-datepicker__day--selected)':
    {
      backgroundColor: 'brand.ghostWhite',
      borderRadius: 0,
      color: 'brand.ghostGray'
    },
  '.react-datepicker__day.react-datepicker__day--in-selecting-range.react-datepicker__day--selecting-range-start':
    {
      backgroundColor: 'brand.accentRed',
      borderRadius: '50%',
      color: 'brand.white'
    },
  '.react-datepicker__day.react-datepicker__day--outside-month': {
    color: 'brand.stroke'
  },
  '.react-datepicker__close-icon': {
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    padding: '0 6px 0 0',
    position: 'absolute',
    top: 0,
    right: '5px',
    height: '100%'
  },
  '.react-datepicker__close-icon::after': {
    content: '"×"',
    cursor: 'pointer',
    height: '16px',
    width: '16px',
    fontSize: '22px',
    backgroundColor: 'transparent',
    color: 'brand.ghostGray'
  }
};
