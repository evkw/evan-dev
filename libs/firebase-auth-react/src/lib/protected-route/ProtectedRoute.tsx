import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../firebase-auth.slice';

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector(selectUser);
  const redirect = () => (
    <Redirect to={{ pathname: '/signin' }} />
  );
  const authRoute = (routeProps, children) =>
    React.cloneElement(children, { ...children.props, ...routeProps });

  return (
    <Route
      {...rest}
      render={routeProps =>
        !!user ? authRoute(routeProps, children) : redirect()
      }
    />
  );
};
