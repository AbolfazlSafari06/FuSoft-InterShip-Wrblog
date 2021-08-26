import { Route, Switch } from "react-router-dom";
import PanellRoute from "./PanellRoute";
import PublicRoutes from "./PublicRoutes";

function Navigation() {
  return (
    <Switch>
      <Route path="/panel/">
        <PanellRoute />
      </Route>
      <Route path="/">
        <PublicRoutes />
      </Route>

    </Switch>
  );
}

export default Navigation;
