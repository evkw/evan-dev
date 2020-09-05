import React, { useCallback, useEffect } from 'react';
import { Route } from 'react-router-dom';
import * as firebase from 'firebase';
import {
  FirebaseAuthReact,
  ProtectedRoute,
  authSuccess
} from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';
import { Admin } from '@evan-dev/admin';
import { MmaHome } from '@evan-dev/mma/home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Gallery } from '@evan-dev/gallery';
import { useHistory } from 'react-router-dom';

export const App = () => {
  const history = useHistory();
  const adminRoutes = [
    {
      path: '',
      display: 'Gallery',
      icon: <DashboardIcon />,
      component: () => <Gallery />
    }
  ];

  const onLogOut = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => history.push('/signin'));
  }, [history]);
  
  return (
    <>
      <Route exact path="/" component={MmaHome} />
      <FirebaseAuthReact
        config={environment.firebaseConfig}
        title={environment.title}
        redirect="/admin"
        onLogOut={onLogOut}
      >
        <ProtectedRoute path="/admin">
          <Admin
            title={environment.title}
            routes={adminRoutes}
            onLogOut={onLogOut}
          />
        </ProtectedRoute>
      </FirebaseAuthReact>
    </>
  );
};

export default App;
