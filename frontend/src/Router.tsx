import { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import AuthContext from './context/AuthContext';

import * as ROUTES from './lib/routes';
import Dashboard from './views/Dashboard';

import Login from './views/Login';

const AuthRoutes = () => (
  <Layout>
    <Dashboard />
  </Layout>
);

const NoAuthRoutes = () => (
  <>
    <Route path={ROUTES.LOGIN} component={Login} />
  </>
);

const Router: React.FC = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>{authenticated ? <AuthRoutes /> : <NoAuthRoutes />}</Switch>
    </BrowserRouter>
  );
};

export default Router;
