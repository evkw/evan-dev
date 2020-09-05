import React from 'react';

import { Route, Link } from 'react-router-dom';

import './mma-home.scss';

/* eslint-disable-next-line */
export interface MmaHomeProps {}

export const MmaHome = (props: MmaHomeProps) => {
  return (
    <div>
      <h1>Welcome to mma-home component!</h1>

      <ul>
        <li>
          <Link to="/">mma-home root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the mma-home root route.</div>}
      />
    </div>
  );
};

export default MmaHome;
