import { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';

export const DeleteWrapper = ({
  onClick,
  children
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Box
      borderRight={isFocused ? '1px solid #E0E0E0' : undefined}
      position="relative"
      onMouseEnter={() => {
        setFocused(true);
      }}
      onMouseLeave={() => {
        setFocused(false);
      }}
    >
      {children}
      {isFocused && (
        <Box
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: '2px',
            position: 'absolute',
            backgroundColor: 'white',
            top: 'calc(50% - 13px)',
            right: '5px'
          }}
        >
          <IconButton
            icon={<MdOutlineDelete />}
            aria-label="edit"
            variant="iconButtonSmall"
            onClick={() => onClick()}
          />
        </Box>
      )}
    </Box>
  );
};
