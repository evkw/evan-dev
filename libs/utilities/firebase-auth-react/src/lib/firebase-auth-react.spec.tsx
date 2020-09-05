import React from 'react';
import { render } from '@testing-library/react';

import FirebaseAuthReact from './firebase-auth-react';

describe(' FirebaseAuthReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FirebaseAuthReact />);
    expect(baseElement).toBeTruthy();
  });
});
