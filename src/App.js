import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LIST_PATH, PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';
import Loadable from 'react-loadable';
import TASLoading from './components/TASLoading/TASLoading';
import { isUserAuthenticated } from './helpers/authUtils';
import CommonLoading from './components/CommonLoading';

// Global styles
import './styles/index.scss';
// import AuthLayout from './components/AuthLayout/AuthLayout';

// loading
const loading = () => TASLoading()

//loading Component
const loadingComponent = () => CommonLoading() 

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout/NonAuthLayout'),
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

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = isUserAuthenticated()
    if (!currentUser) {
      navigate(LIST_PATH.LOGIN)
    }
  }, [])

  return (
    // rendering the router with layout
    <React.Fragment>
      <Routes>
        {PUBLIC_ROUTES.map((route, index) => (route.component
          ? (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={
                <Suspense fallback={loading()}>
                  <NonAuthLayout>
                    <route.component />
                  </NonAuthLayout>
                </Suspense>
              }
            />
          )
          : null))}
        <Route element={<AuthLayout />}>
          {PRIVATE_ROUTES.map((route, index) => (route.component
            ? (
              <Route
                key={index}
                path={route.path}
                element={
                  <Suspense fallback={loadingComponent()}>
                    <route.component />
                  </Suspense>
                }
              />
            )
            : null))}
        </Route>
      </Routes>
    </React.Fragment >
  );
}

export default App;
