import React from 'react'
import { Switch } from "react-router-dom"; 
import Categories from '../components/panells/Categories/Categories'; 
import Panellayout from '../components/panells/Layout/layout';
import CreateUser from '../components/panells/Users/CreateUser';
import EditUser from '../components/panells/Users/EditUser';
import User from "../components/panells/Users/User"; 
import Route from "./Route";
import CreateCategory from './../components/panells/Categories/CreateCategory';
import EditCategory from './../components/panells/Categories/EditCategory';
import Article from '../components/panells/Article/Article';
import CreateArticle from './../components/panells/Article/CreateArticle';
import EditArticle from './../components/panells/Article/EditArticle'; 
import Comments from '../components/panells/Comments/Comments';

function PanellRoute() {
    return (
        <Panellayout>
            <Switch>
                <Route exact path="/panel/users">
                    <User />
                </Route>
                <Route exact path="/panel/users/create">
                    <CreateUser />
                </Route>
                <Route exact path="/panel/users/:id/edit">
                    <EditUser />
                </Route>
                <Route exact path="/panel/categories">
                    <Categories />
                </Route>
                <Route exact path="/panel/categories/create">
                    <CreateCategory />
                </Route>
                <Route exact path="/panel/categories/:id/edit"> 
                    <EditCategory />
                </Route>
                <Route exact path="/panel/articles/"> 
                    <Article/>
                </Route>
                <Route exact path="/panel/articles/create"> 
                    <CreateArticle/>
                </Route>
                <Route exact path="/panel/article/:id/edit"> 
                    <EditArticle />
                </Route>
                <Route exact path="/panel/comments"> 
                    <Comments />
                </Route>
            </Switch>
        </Panellayout>
    )
}

export default PanellRoute
