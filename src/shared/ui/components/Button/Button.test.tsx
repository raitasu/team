import React from 'react';

import { render } from '@testing-library/react';

import { Button } from './index';

it('should forward ref to button', () => {
  const ref = React.createRef<HTMLButtonElement>();

  render(<Button ref={ref}>Test Button</Button>);
  expect(ref.current).toBeInstanceOf(Node);
  expect(ref.current?.nodeName).toBe('BUTTON');
});
