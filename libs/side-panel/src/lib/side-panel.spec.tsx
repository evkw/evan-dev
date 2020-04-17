import React from 'react';
import { render } from '@testing-library/react';

import SidePanel from './side-panel';

describe(' SidePanel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidePanel />);
    expect(baseElement).toBeTruthy();
  });
});
