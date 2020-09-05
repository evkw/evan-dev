import React from 'react';
import { render } from '@testing-library/react';

import MmaHome from './mma-home';

describe(' MmaHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MmaHome />);
    expect(baseElement).toBeTruthy();
  });
});
