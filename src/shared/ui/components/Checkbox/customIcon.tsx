import { Icon } from '@chakra-ui/react';

export const CustomIcon = ({ isChecked }: { isChecked?: boolean }) => {
  const d = isChecked
    ? 'M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM14.99 6L13.58 4.58L6.99 11.17L4.41 8.6L2.99 10.01L6.99 14L14.99 6Z'
    : 'M16 2V16H2V2H16ZM16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0Z';

  return (
    <Icon viewBox="0 0 18 18">
      <path
        fill="currentColor"
        d={d}
      />
    </Icon>
  );
};
