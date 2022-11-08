import {
  Box,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  VStack
} from '@chakra-ui/react';
import { MdDone, MdOutlineAttachFile } from 'react-icons/md';

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
    <HStack
      spacing={4}
      marginBottom="20px"
    >
      <VStack>
        <Tag
          size="lg"
          style={{ borderColor: '#56A06B' }}
          width="130px"
        >
          <TagLabel>In progress</TagLabel>
        </Tag>
        <Tag
          size="lg"
          style={{ borderColor: '#CE9D1E' }}
          width="130px"
        >
          <TagLabel>On hold</TagLabel>
        </Tag>
        <Tag
          size="lg"
          style={{ borderColor: '#646271' }}
          width="130px"
        >
          <TagLabel>Canceled</TagLabel>
        </Tag>
        <Tag
          size="lg"
          style={{ borderColor: '#0077B5' }}
          width="130px"
        >
          <TagLabel>Compleded</TagLabel>
        </Tag>
        <Tag
          size="lg"
          variant="colorCloseBtn"
          width="146px"
        >
          <TagLeftIcon as={MdOutlineAttachFile} />
          <TagLabel>Document</TagLabel>
          <TagCloseButton />
        </Tag>
      </VStack>
    </HStack>
  </Box>
);
