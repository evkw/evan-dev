import React, { useEffect, createContext, useState } from 'react';

import './firebase-auth-react.scss';
import { auth } from 'firebase';
import { Route } from 'react-router-dom';
import SignIn from './sign-in/sign-in';
import SignUp from './sign-up/sign-up';
import PasswordReset from './password-reset/password-reset';
import { generateUserDocument } from './functions/generateUserDoc';

export const UserContext = createContext({user: null});

export const FirebaseAuthReact = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth().onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      console.log(user);
      setUser(user);
    });
  }, [])
  
  return (
    <UserContext.Provider value={user}>
      {props.children}
      }
      <Route path="/signin" component={() => <SignIn title={props.title || 'App'}/>}/>
      <Route path="/signup" component={SignUp} />
      <Route path="/reset-password" component={PasswordReset} />
    </UserContext.Provider>
  );
};

export default FirebaseAuthReact;
