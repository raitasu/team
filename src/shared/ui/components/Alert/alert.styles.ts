import type { AlertStatus } from '@chakra-ui/alert';

export const AlertStyles: Partial<
  Record<AlertStatus, Partial<CSSStyleDeclaration>>
> = {
  success: {
    borderColor: 'brand.stroke'
  },
  error: {
    borderColor: 'brand.accentRed'
  }
};
