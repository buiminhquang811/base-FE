import React from "react";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { getLoggedInUser, isUserAuthenticated } from "./helpers/authUtils";

export const LIST_PATH = {
  HOME: '/',
  LOGIN: 'login',
  EXAMPLE: '/example-component'
}

//lazy loading
const Login = React.lazy(() => import("./pages/auth/Login"));
const Home = React.lazy(() => import("./pages/Home"));
const ExampleComponent = React.lazy(() => import("./pages/ExampleComponent"))


export const PrivateRoute = ({ children, roles, ...rest }) => {
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
  if (roles && roles.length && !roles.includes(loggedInUser.role)) {
    // role not authorised so redirect to home page
    return <Navigate to="/" />;
  }


  return children
}

export const PUBLIC_ROUTES = [
  {
    path: LIST_PATH.LOGIN,
    exact: true,
    name: 'Đăng nhập',
    component: Login,
  },
]

export const PRIVATE_ROUTES = [
  {
    path: LIST_PATH.HOME,
    exact: true,
    name: 'Trang chủ',
    component: Home,
  },
  {
    path: LIST_PATH.EXAMPLE,
    exact: true,
    name: 'Example',
    component: ExampleComponent,
  },
]


