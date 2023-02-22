import { Heading, Divider } from '@chakra-ui/react';

export const CVHeading = ({ text }: { text: string }) => (
  <>
    <Heading
      size="lg"
      sx={{ textTransform: 'uppercase' }}
    >
      {text}
    </Heading>
    <Divider sx={{ border: '1px solid #EF4523' }} />
  </>
);
