import { ComponentStyleConfig } from '@chakra-ui/theme';

import { HEADER_HEIGHT } from '~/shared/ui/ui.constants';

export const Drawer: ComponentStyleConfig = {
  variants: {
    filters: {
      dialog: {
        height: `calc(100vh - ${HEADER_HEIGHT})`,
        marginTop: HEADER_HEIGHT
      },
      closeButton: {
        color: 'brand.accentRed',
        right: '15px',
        top: '15px'
      }
    }
  }
};
