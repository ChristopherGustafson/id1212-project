import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "./lib/routes";

import Login from "./views/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
