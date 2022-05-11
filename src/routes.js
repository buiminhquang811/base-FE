import React from "react";
import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { getLoggedInUser, isUserAuthenticated } from "./helpers/authUtils";

//lazy loading
const Login = React.lazy(() => import("./pages/auth/Login"));

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const isAuthTokenValid = isUserAuthenticated();
			if (!isAuthTokenValid) {
				// not logged in so redirect to login page with the return url
				return (
					<Navigate to="/login" replace />
				);
			}

			const loggedInUser = getLoggedInUser();
			// check if route is restricted by role
			if (roles && !roles.includes(loggedInUser.role)) {
				// role not authorised so redirect to home page
				return <Navigate to="/" />;
			}
			// authorised so return component
			return <Component {...props} />;
		}}
	/>
);

const routes = [
	// auth
	{ path: "/login", name: "Login", component: Login, route: Route,  exact: true },
	// home
	// { path: "/home", name: "Home", component Home, route: Route, exact: true },
]

export { routes, PrivateRoute };