import {
  Box,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon
} from '@chakra-ui/react';
import { MdDone } from 'react-icons/md';

export default {
  title: 'UI/Tag',
  component: Tag
};

export const Variants = () => (
  <Box>
    <HStack
      spacing={4}
      marginBottom="20px"
    >
      {['sm', 'md', 'lg'].map((size) => (
        <Tag
          size={size}
          key={size}
        >
          Hello
        </Tag>
      ))}
    </HStack>
    <HStack
      spacing={4}
      marginBottom="20px"
    >
      {['sm', 'md', 'lg'].map((size) => (
        <Tag
          size={size}
          key={size}
        >
          <TagLeftIcon as={MdDone} />
          <TagLabel>Hello</TagLabel>
        </Tag>
      ))}
    </HStack>
    <HStack
      spacing={4}
      marginBottom="20px"
    >
      {['sm', 'md', 'lg'].map((size) => (
        <Tag
          size={size}
          key={size}
        >
          <TagLabel>Hello</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </HStack>
    <HStack
      spacing={4}
      marginBottom="20px"
    >
      {['sm', 'md', 'lg'].map((size) => (
        <Tag
          size={size}
          key={size}
        >
          <TagLeftIcon as={MdDone} />
          <TagLabel>Hello</TagLabel>
          <TagCloseButton />
        </Tag>
      ))}
    </HStack>
  </Box>
);
