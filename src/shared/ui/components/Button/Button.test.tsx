import React from 'react';

import { render } from '@testing-library/react';
import { test, expect } from 'vitest';

import { Button } from './index';

test('should forward ref to button', () => {
  const ref = React.createRef<HTMLButtonElement>();

  render(<Button ref={ref}>Test Button</Button>);
  expect(ref.current).toBeInstanceOf(Node);
  expect(ref.current?.nodeName).toBe('BUTTON');
});
