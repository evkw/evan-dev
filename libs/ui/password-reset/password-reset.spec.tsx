import React from 'react';
import { render } from '@testing-library/react';

import PasswordReset from './password-reset';

describe(' PasswordReset', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PasswordReset />);
    expect(baseElement).toBeTruthy();
  });
});
