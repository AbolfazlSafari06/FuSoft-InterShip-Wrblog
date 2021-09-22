import React from 'react'
import { Switch } from "react-router-dom";
import MainPage from "../components/mainPage/MainPage";
import Home from "../components/home/Home";
import Search from "../components/search/Search";
import Categories from "../components/categories/Categories";
import About from "../components/other/About";
import Header from "../common/Header";
import Footer from "../common/Footer/Footer";
import Route from "./Route";
import ArticleVew from './../View/ArticleVew';


function PublicRoutes() {
    return (
        <div>
            <Header title="Home" />
            <Switch>
                <Route exact path="/mainpage">
                    <MainPage />
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
                <Route path="/article/view/:id">
                    <ArticleVew />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default PublicRoutes
