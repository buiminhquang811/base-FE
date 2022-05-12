import React, { Component, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { routes } from './routes';
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
  delay: 500000,
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

// /**
//  * Exports the component with layout wrapped to it
//  * @param {} WrappedComponent 
//  */
// const withLayout = (WrappedComponent) => {
//   const HOC = class extends Component {
//     render() {
//       return <WrappedComponent {...this.props} />;
//     }
//   };

//   return HOC;
// }

const App = () => {
  /**
 * Returns the layout component based on different properties
 * @param {*} props 
 */
  const getLayout = () => {
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  };

  const renderRouteHasChilds = (route) => {
    const Layout = getLayout();
    return !route.childs ? (
      <route.route
        key={route.name}
        path={route.path}
        exact={route.exact}
        roles={route.roles}
        element={
          <Suspense key={route.name} fallback={loading()}>
            <Layout title={route.title}>
              <route.component />
            </Layout>
          </Suspense>
        }
      />
    ) : (
      <>
        {route.childs.map(i => renderRouteHasChilds(i))}
      </>
    );
  }

  return (
    // rendering the router with layout
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          {routes.map((route) => renderRouteHasChilds(route))}
        </Routes>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
