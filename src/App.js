import React, { Component, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateRoute, routes } from './routes';
import Loadable from 'react-loadable';
import TASLoading from './components/TASLoading/TASLoading';

// setup fake backend
import { configureFakeBackend } from './helpers/fake-backend';
import { isUserAuthenticated } from './helpers/authUtils';

// Global styles
import './styles/index.scss';

// make component loading later
const loading = () => TASLoading()

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const AuthLayout = Loadable({
  loader: () => import('./components/AuthLayout/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

configureFakeBackend();

const App = () => {
  /**
 * Returns the layout component based on different properties
 * @param {*} props 
 */
  const getLayout = () => {
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  };

  const renderRoute = (route) => {
    const Layout = getLayout();
    return (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        element={
          <Suspense key={route.name} fallback={loading()}>
            <Layout title={route.title}>
              {route.type === 'PRIVATE' ? (
                <PrivateRoute>
                  <route.component />
                </PrivateRoute>
              ) : (
                <route.component />
              )}
            </Layout>
          </Suspense>
        }
      />
    )
  }

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          {routes.map((route) => renderRoute(route))}
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
