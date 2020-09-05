import React, { useCallback } from 'react';

import { Route } from 'react-router-dom';
import SignIn from './sign-in/sign-in';
import SignUp from './sign-up/sign-up';
import PasswordReset from './password-reset/password-reset';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInEmail, checkUserPersistance, selectCheckedPersistence } from './firebase-auth.slice';
import firebase from 'firebase';

export const FirebaseAuthReact = props => {
  if (!firebase.apps.length) {
    firebase.initializeApp(props.config);
    firebase.auth().setPersistence('local');
  }

  const dispatch = useDispatch();
  const history = useHistory();

  dispatch(checkUserPersistance())
  const persistenceChecked = useSelector(selectCheckedPersistence);

  const handleEmailAndPassword = useCallback(
    (event, email, password) => {
      event.preventDefault();
      dispatch(signInEmail(email, password, props.redirect, history));
    },
    [dispatch, history]
  );

  // if(!!persistenceChecked) {
  //   return <div>test</div>
  // }

  return (
    <>
      {props.children}
      <Route
        path="/signin"
        component={() => (
          <SignIn
            title={props.title || 'App'}
            onEmailAndPassword={handleEmailAndPassword}
          />
        )}
      />
      <Route path="/signup" component={SignUp} />
      <Route path="/reset-password" component={PasswordReset} />
    </>
  );
};

export default FirebaseAuthReact;
