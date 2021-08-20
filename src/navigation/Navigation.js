import { Route, Switch } from "react-router-dom";
import Categories from "../components/categories/Categories";
import Home from "../components/home/Home";
import MainPage from "../components/mainPage/MainPage";
import About from "../components/other/About";
import Search from "../components/search/Search";

function Navigation() {
  return (
    <Switch>
      <Route exact path="/mainpage">
        <MainPage /> 
      </Route>
      <Route exact path="/users">
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
