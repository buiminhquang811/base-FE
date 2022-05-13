import React from "react";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { getLoggedInUser, isUserAuthenticated } from "./helpers/authUtils";

//lazy loading
const Login = React.lazy(() => import("./pages/auth/Login"));

const PrivateRoute = ({ children, roles, ...rest }) => {
  // check login
  const isAuthTokenValid = isUserAuthenticated();
  if (!isAuthTokenValid) {
    // not logged in so redirect to login page with the return url
    return (
      <Navigate to="/login" replace />
    );
  }

  // check roles
  const loggedInUser = getLoggedInUser();
  //check if route is restricted by role
  if (roles && !roles.includes(loggedInUser.role)) {
    // role not authorised so redirect to home page
    return <Navigate to="/" />;
  }
}

const routes = [
  // auth
  { path: "/login", name: "Login", component: Login, type: 'PUBLIC', exact: true },
  // home
  { path: "/home", name: "Home", component: Login, type: 'PRIVATE', exact: true, roles: [] },
]

export { routes, PrivateRoute };