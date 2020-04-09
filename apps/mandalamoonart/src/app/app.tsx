import React from 'react';
import { Route } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseAuthReact, ProtectedRoute } from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';
import { Admin } from '@evan-dev/admin';
import { MmaHome } from '@evan-dev/mma/home';
import { Settings } from '@evan-dev/settings';
import SettingsIcon from '@material-ui/icons/Settings';

export const App = () => {
  firebase.initializeApp(environment.firebaseConfig);

  const adminRoutes = [
    {
      path: '/settings',
      display: 'Settings',
      icon: <SettingsIcon/>,
      component: <Settings/>
    }
  ]
  return (
    <FirebaseAuthReact title={environment.title} redirect='/admin'>
        <Route path='/home' component={MmaHome} />
        <ProtectedRoute path='/admin'>
            <Admin title={environment.title} routes={adminRoutes}/>
        </ProtectedRoute>
    </FirebaseAuthReact>

  );
};

export default App;
