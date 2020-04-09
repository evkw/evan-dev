import React from 'react';
import { Route } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseAuthReact, ProtectedRoute } from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';
import { Admin } from '@evan-dev/admin';
import { Dashboard } from '@evan-dev/dashboard';
import { MmaHome } from '@evan-dev/mma/home';
import { Settings } from '@evan-dev/settings';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';

export const App = () => {
  firebase.initializeApp(environment.firebaseConfig);

  const adminRoutes = [
    {
      path: '',
      display: 'Dashboard',
      icon: <DashboardIcon/>,
      component: () => <Dashboard/>
    }
  ]
  return (
    <FirebaseAuthReact title={environment.title} redirect='/admin'>
        <Route exact path='/' component={MmaHome} />
        <ProtectedRoute path='/admin'>
            <Admin title={environment.title} routes={adminRoutes}/>
        </ProtectedRoute>
    </FirebaseAuthReact>

  );
};

export default App;
