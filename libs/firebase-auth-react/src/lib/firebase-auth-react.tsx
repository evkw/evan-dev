import React, { useEffect, createContext, useState } from 'react';

import './firebase-auth-react.scss';
import { auth } from 'firebase';
import { Route } from 'react-router-dom';
import SignIn from './sign-in/sign-in';
import SignUp from './sign-up/sign-up';
import PasswordReset from './password-reset/password-reset';
import { generateUserDocument } from './functions/generateUserDoc';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext({user: null});
export const FirebaseAuthReact = (props) => {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().setPersistence('local')
    auth().onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      setUser(user);
    });
  }, [])

  const handleEmailAndPassword = (event, email, password) => {
    event.preventDefault();
    auth().signInWithEmailAndPassword(email, password).then(() => history.push(props.redirect)).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };
  
  return (
    <UserContext.Provider value={{user}}>
      {props.children}
      <Route path="/admin" component={() => <SignIn title={props.title || 'App'} onEmailAndPassword={handleEmailAndPassword}/>}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/reset-password" component={PasswordReset} />
    </UserContext.Provider>
  );
};

export default FirebaseAuthReact;
