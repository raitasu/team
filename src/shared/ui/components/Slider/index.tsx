import React from 'react';

import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  type SliderProps,
  SliderThumb,
  type SliderThumbProps,
  SliderTrack,
  type SliderTrackProps
} from '@chakra-ui/react';
import { type SliderInnerTrackProps } from '@chakra-ui/slider';

export const Slider = React.forwardRef<
  HTMLDivElement,
  SliderProps & {
    thumbProps?: SliderThumbProps;
    filledTrackProps?: SliderInnerTrackProps;
    trackProps?: SliderTrackProps;
  }
>(({ trackProps, filledTrackProps, thumbProps, ...sliderProps }, ref) => (
  <ChakraSlider
    ref={ref}
    {...sliderProps}
  >
    <SliderTrack {...trackProps}>
      <SliderFilledTrack {...filledTrackProps} />
    </SliderTrack>
    <SliderThumb {...thumbProps} />
  </ChakraSlider>
));
