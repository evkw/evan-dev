import React from 'react';

import { Route, Link } from 'react-router-dom';

import './settings.scss';

/* eslint-disable-next-line */
export interface SettingsProps {}

export const Settings = (props: SettingsProps) => {
  return (
    <div>
      <h1>Welcome to settings component!</h1>

      <ul>
        <li>
          <Link to="/">settings root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the settings root route.</div>}
      />
    </div>
  );
};

export default Settings;
