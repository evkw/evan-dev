import { Route, Redirect } from "react-router-dom";
import React from 'react';

export const ProtectedRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          false ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }