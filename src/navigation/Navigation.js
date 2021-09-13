import { Switch } from "react-router-dom";
import PanellRoute from "./PanellRoute";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import Route from "./Route";

function Navigation() {
  return (
    <Switch>
      <Route admin path="/panel/">
        <PanellRoute />
      </Route>
      <Route guest path="/auth/">
        <AuthRoutes />
      </Route>
      <Route path="/">
        <PublicRoutes />
      </Route>
    </Switch>
  ); 
}

export function isActiveRoute(route, pattern) {
  const regex = new RegExp(pattern);
  return regex.test(route);
}
export default Navigation;
