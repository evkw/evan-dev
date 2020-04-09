import { Route, Redirect } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../firebase-auth-react';

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useContext(UserContext);
  const redirect = () => (
    <Redirect to={{ pathname: '/signin', state: { from: location } }} />
  );
  const authRoute = (routeProps, children) =>
    React.cloneElement(children, { ...children.props, ...user, ...routeProps });

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!user ? authRoute(routeProps, children) : redirect()
      }
    />
  );
};
