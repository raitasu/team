import { type ProjectStatuses } from '~/store/api/employees/employees.types';

export const borderColor = (status: ProjectStatuses | null) => {
  switch (status) {
    case 'in_progress':
      return '10px solid var(--chakra-colors-brand-accentGreen)';
    case 'on_hold':
      return '10px solid var(--chakra-colors-brand-accentYellow)';
    case 'wasted':
      return '10px solid var(--chakra-colors-brand-ghostGray)';
    case 'completed':
      return '10px solid var(--chakra-colors-brand-accentBlue)';
    default:
      return '2px solid var(--chakra-colors-brand-stroke)';
  }
};
