import { useState } from 'react';

import { Heading, Divider, Box } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';

export const CVHeading = ({
  text,
  addHandler
}: {
  text: string;
  addHandler?: () => void;
}) => {
  const [isFocused, setFocused] = useState(false);

  return (
    <Box
      position="relative"
      onMouseEnter={() => {
        setFocused(true);
      }}
      onMouseLeave={() => {
        setFocused(false);
      }}
    >
      <Heading
        size="lg"
        sx={{ textTransform: 'uppercase' }}
        mt={2}
      >
        {text}
      </Heading>
      {isFocused && (
        <Box
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: '2px',
            position: 'absolute',
            backgroundColor: 'white',
            top: '3px',
            right: '3px'
          }}
        >
          <IconButton
            icon={<MdAdd />}
            aria-label="edit"
            variant="iconButtonSmall"
            onClick={addHandler}
          />
        </Box>
      )}
      <Divider sx={{ border: '1px solid #EF4523' }} />
    </Box>
  );
};
