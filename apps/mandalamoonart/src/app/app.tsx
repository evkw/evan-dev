import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as firebase from 'firebase';
import { FirebaseAuthReact } from '@evan-dev/firebase-auth-react';
import { environment } from '../environments/environment';
import '../tailwind.css';

export const App = () => {
  firebase.initializeApp(environment.firebaseConfig);
  return (
    <FirebaseAuthReact title={environment.title}>

    </FirebaseAuthReact>

  );
};

export default App;
