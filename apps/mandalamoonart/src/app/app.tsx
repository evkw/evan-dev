import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseAuthReact, ProtectedRoute } from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';
import { Settings } from '@evan-dev/settings';
import { Admin } from '@evan-dev/admin';

export const App = () => {
  firebase.initializeApp(environment.firebaseConfig);
  return (
    <FirebaseAuthReact title={environment.title} redirect='/settings'>
      
      <ProtectedRoute path='/admin' component={() => <Admin title={environment.title}/>} />
      <ProtectedRoute path='/settings' component={Settings} />
    </FirebaseAuthReact>

  );
};

export default App;
