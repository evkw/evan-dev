import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseAuthReact, ProtectedRoute } from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';

export const App = () => {
  firebase.initializeApp(environment.firebaseConfig);
  return (
    <FirebaseAuthReact title={environment.title}>
      <ProtectedRoute path="/protected">
      </ProtectedRoute>
    </FirebaseAuthReact>

  );
};

export default App;
