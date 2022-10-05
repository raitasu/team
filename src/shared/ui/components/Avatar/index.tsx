import React from 'react';

import { Avatar as ChakraAvatar, AvatarProps } from '@chakra-ui/react';

import defaultAvatar from './defaultAvatar.svg';

export const Avatar = ({
  src,
  ...passThroughProps
}: Omit<AvatarProps, 'bg'>) => (
  <ChakraAvatar
    {...passThroughProps}
    bg="brand.stroke"
    src={src || defaultAvatar}
  />
);
