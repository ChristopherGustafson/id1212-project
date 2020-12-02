import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import AuthContext from './context/AuthContext';

import * as ROUTES from './lib/routes';
import CreateGame from './views/CreateGame';
import Game from './views/Game';
import JoinGame from './views/JoinGame';

import Login from './views/Login';

const AuthRoutes = () => (
  <Layout>
    <Switch>
      <Route path={ROUTES.JOIN_GAME} component={JoinGame} />
      <Route path={ROUTES.CREATE_GAME} component={CreateGame} />
      <Route path={ROUTES.PLAY_GAME} component={Game} />
      <Route>
        <Redirect to={ROUTES.JOIN_GAME} />
      </Route>
    </Switch>
  </Layout>
);

const NoAuthRoutes = () => (
  <Switch>
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route>
      <Redirect to={ROUTES.LOGIN} />
    </Route>
  </Switch>
);

const Router: React.FC = () => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? <AuthRoutes /> : <NoAuthRoutes />;
};

export default Router;
