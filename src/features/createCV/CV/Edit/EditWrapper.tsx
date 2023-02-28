import { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';

export const EditWrapper = ({
  onClick,
  children,
  isInline
}: {
  onClick: () => void;
  children: React.ReactNode;
  isInline?: boolean;
}) => {
  const [isFocused, setFocused] = useState(false);

  const bluredStyles = {
    cursor: 'pointer',
    color: 'transparent',
    textShadow: '0 0 2px #000'
  };

  return (
    <Box
      display={isInline ? 'inline-block' : 'block'}
      sx={isFocused ? bluredStyles : undefined}
      position="relative"
      onClick={() => onClick()}
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
            left: 'calc(50% - 12px)'
          }}
        >
          <IconButton
            icon={<MdOutlineEdit />}
            aria-label="edit"
            variant="iconButtonSmall"
          />
        </Box>
      )}
    </Box>
  );
};
