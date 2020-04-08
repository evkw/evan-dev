import { Route, Redirect } from "react-router-dom";
import React, { useContext } from 'react';
import { UserContext } from '../firebase-auth-react';

export const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const user = useContext(UserContext);
  console.log(user);
    return (
        <Route {...rest} render={
          routeProps => !!user 
          ? <RouteComponent  {...routeProps}/> 
          : <Redirect 
              to={{
                pathname: '/signin',
                state: { from: location }
              }}
              />
          }
      />
    );
  }
