import { Route, Switch } from "react-router-dom";
import Categories from "../components/categories/Categories";
import Home from "../components/home/Home";
import About from "../components/other/About";
import Search from "../components/search/Search";

function Navigation() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/categories">
        <Categories />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  );
}

export default Navigation;
